import { Injectable } from '@nestjs/common';
import { PasswordRecovery } from './entities/password.entity';
import { User } from '../user/user.entity';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';

@Injectable()
export class PasswordService {
  async passwordRecovery(req: PasswordRecovery, res: Response): Promise<any> {
    const { email } = req;
    try {
      //
      // chack is user in db
      //
      const user = await User.findOne({
        where: {
          email,
        },
      });
      console.log(user.pwdHash);
      //
      // if there is user, create recovery link
      //
      if (user) {
        //creating recovery link valid for 10 mins

        const secret = process.env.JWT_SECRET + user.pwdHash;
        const payload = {
          email: user.email,
          id: user.id,
        };
        const token = sign(payload, secret, {
          expiresIn: '10m',
        });

        const link = `localhost:3001/pwd-recovery/${user.id}/${token}`;

        console.log(link);

        return res.json({
          msg: 'recovery link został wysłany na podany adres',
        });
      }
      return res.json({
        msg: 'no user in db',
      });
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
}
