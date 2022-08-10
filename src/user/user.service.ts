import { Inject, Injectable } from "@nestjs/common";
import { RegisterDto } from './dto/register.dto';
import { RegisterUserResponse } from '../interfaces/user';
import { User } from './user.entity';
import { hashPwd } from '../utils/hash-pwd';
import { Role } from '../role/role.entity';
import { v4 as uuid } from 'uuid';
import { MailService } from "../mail/mail.service";

@Injectable()
export class UserService {
  constructor(@Inject(MailService) private mailService: MailService) {
  }

  filter(user: User): RegisterUserResponse {
    const { id, email } = user;
    return { id, email };
  }

  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    const user = new User();
    user.email = newUser.email;
    user.pwdHash = await hashPwd(newUser.pwd);

    const role = await Role.findOne({ where: { type: newUser.roleName } });

    if (!role) {
      return {
        isSuccessful: false,
        message: 'Nie znaleziono podanej roli.',
      };
    }
    user.role = role;

    if (await User.findOne({ where: { email: user.email } })) {
      return {
        isSuccessful: false,
        message: `Użytkownik z e-mailem: '${user.email}' już istnieje. Zaloguj się na konto lub stwórz konto używając inny adres e-mail.`,
      };
    }

    if (newUser.roleName === 'student') {
      user.registerToken = uuid();
      await this.sendMailToStudent(user.email, user.registerToken);
    }

    await user.save();
    return this.filter(user);
  }

  async sendMailToStudent(email: string, registerToken: string) {
    const link = `${process.env.FRONT_URL}/register-student/${registerToken}`;

    await this.mailService.sendMail(
      email,
      'Uzupełnienie profilu studenta',
      `<div>
                  <p>Aby uzupełnić profil <a href='${link}'>Kliknij tutaj</a></p>
                  <p>Jeśli link nie działa, wklej następujący odnośnik w okno przeglądarki: </p>
                  <p>${link}</p>
                  <br/>
                  <p>Pozdrawiamy</p>
                  <p>Zespół hh17.pl</p>
                  </div>`,
    );
  }
}
