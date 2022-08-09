import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../user/user.entity';
import { Students } from '../students/students.entity';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtPayload } from './jwt.strategy';
import { comparePwd } from '../utils/compare-pwd';
import { DataSource } from 'typeorm';
import { StudentsProfile } from '../students_profile/students_profile.entity';
import { Role } from '../role/role.entity';
import { HrsService } from '../hrs/hrs.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DataSource) private datasource: DataSource,
    @Inject(HrsService) private readonly hrsService: HrsService,
  ) {}

  private static createToken(currentTokenId: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentTokenId };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, process.env.JWT_SECRET, { expiresIn });

    return {
      accessToken,
      expiresIn,
    };
  }

  private static async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await User.findOne({
        where: { currentTokenId: token },
      });
    } while (!!userWithThisToken);

    user.currentTokenId = token;
    await user.save();

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    const { email, pwd } = req;
    try {
      const user = await User.createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'role')
        .where('user.email = :email', { email })
        .getOne();

      if (!user) {
        return res.json({
          error: 'Użytkownik z podanym emailem nie istnieje.',
        });
      }

      const validPassword = await comparePwd(pwd, user.pwdHash);

      if (validPassword) {
        const token = AuthService.createToken(
          await AuthService.generateToken(user),
        );

        const userRole = user.role.type;

        if (userRole === 'admin') {
          return res
            .cookie('jwt', token.accessToken, {
              secure: true,
              // domain: 'localhost',
              httpOnly: true,
              sameSite: 'none',
            })
            .json({
              email: user.email,
              role: 1,
            });
        } else if (userRole === 'hr') {
          const hrData = await this.hrsService.getOneHr(user.id);
          if ('error' in hrData) {
            return res.json(hrData);
          }
          return res
            .cookie('jwt', token.accessToken, {
              secure: true,
              // domain: 'localhost',
              httpOnly: true,
              // sameSite: 'none',
            })
            .json({
              role: 2,
              // @ts-ignore
              id: hrData.id,
              // @ts-ignore
              fullName: hrData.fullName,
              // // @ts-ignore
              // company: hrData.company,
              // email: user.email,
            });
        } else if (userRole === 'student') {
          const studentData = await User.createQueryBuilder('user')
            .leftJoinAndSelect('user.students', 'students')
            .leftJoinAndSelect('students.studentsProfile', 'studentsProfile')
            .where('user.id = :id', { id: user.id })
            .getOne();

          if (!studentData) {
            res.json({ message: 'Nie udało się pobrać danych kursanta.' });
          }

          const fullName = `${studentData.students.studentsProfile.firstName} ${studentData.students.studentsProfile.lastName}`;

          return res
            .cookie('jwt', token.accessToken, {
              secure: true,
              // domain: 'localhost',
              httpOnly: true,
              // sameSite: 'none',
            })
            .json({
              role: 3,
              id: studentData.students.id,
              // email: studentData.email,
              // contactEmail: studentData.students.studentsProfile.email,
              // firstName: studentData.students.studentsProfile.firstName,
              // lastName: studentData.students.studentsProfile.lastName,
              fullName,
              githubPhotoUrl:
                studentData.students.studentsProfile.githubPhotoUrl,
            });
        }

        return res.json({
          message: 'Niepoprawna rola użytkownika.',
        });
      } else {
        return res
          .status(400)
          .json({ error: 'Podano niepoprawny email lub hasło.' });
      }
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async logout(user: User, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: true,
        // domain: 'localhost',
        httpOnly: true,
        sameSite: 'none',
      });
      return res.json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  getHello(): string {
    return 'U see it only if u are logged and got role';
  }
}
