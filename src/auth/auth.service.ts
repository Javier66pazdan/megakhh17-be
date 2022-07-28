import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../user/user.entity';
import { sign } from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtPayload } from './jwt.strategy';
import { comparePwd } from '../utils/compare-pwd';

@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {
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

  private async generateToken(user: User): Promise<string> {
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
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.json({
          error: 'Użytkownik z podanym emailem nie istnieje.',
        });
      }

      const validPassword = await comparePwd(pwd, user.pwdHash);

      if (validPassword) {
        const token = this.createToken(await this.generateToken(user));

        return res
          .cookie('jwt', token.accessToken, {
            secure: false,
            domain: 'localhost',
            httpOnly: true,
          })
          .json({ ok: true });
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
        secure: false,
        domain: 'localhost',
        httpOnly: true,
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
