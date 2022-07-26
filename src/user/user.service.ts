import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { RegisterUserResponse } from '../interfaces/user';
import { User } from './user.entity';
import { hashPwd } from '../utils/hash-pwd';

@Injectable()
export class UserService {
  filter(user: User): RegisterUserResponse {
    const { id, email } = user;
    return { id, email };
  }

  async register(newUser: RegisterDto): Promise<RegisterUserResponse> {
    const user = new User();
    user.email = newUser.email;
    user.pwdHash = await hashPwd(newUser.pwd);

    if (await User.findOne({ where: { email: user.email } })) {
      return {
        isSuccessful: false,
        message: `Użytkownik z e-mailem: '${user.email}' już istnieje. Zaloguj się na konto lub stwórz konto używając inny adres e-mail.`,
      };
    }
    await user.save();
    return this.filter(user);
  }
}
