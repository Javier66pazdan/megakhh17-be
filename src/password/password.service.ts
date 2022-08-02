import { Inject, Injectable } from '@nestjs/common';
import { PasswordRecovery, PasswordReset } from './entities/password.entity';
import { User } from '../user/user.entity';
import { Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { hashPwd } from '../utils/hash-pwd';
import { MailService } from '../mail/mail.service';

@Injectable()
export class PasswordService {
  constructor(@Inject(MailService) private mailService: MailService) {}

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

        const link = `${process.env.FRONT_URL}/pwd-recovery/${user.id}/${token}`;

        //
        // send email with recovery
        //
        try {
          await this.mailService.sendMail(
            user.email,
            'Reset hasła w serwisie: hh-17.pl',
            `<div>
                  <p>Aby zresetować hasło <a href='${link}'>Kliknij tutaj</a></p>
                  <p>Jeśli link nie działa, wklej następujący odnośnik w okno przeglądarki: </p>
                  <p>${link}</p>
                  <br/>
                  <p>Jeśli to nie Ty wysłałeś prośbę o zmianę hasła, zignoruj tego maila.</p>
                  <br/>
                  <p>Link pozostanie aktywny przez najbliższe 10 minut</p>
                  <br/>
                  <p>Pozdrawiamy</p>
                  <p>Zespół hh17.pl</p>
                  </div>`,
          );
        } catch (e) {
          console.log(e.message);
        }
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

  async passwordReset(req: PasswordReset, res: Response): Promise<any> {
    // console.log(req);
    const { id, token, password1, password2 } = req;

    //
    // Check is user is in db
    //
    const user = await User.findOne({
      where: { id },
    });
    // console.log(user);
    if (user.id !== id) {
      return res.json({
        msg: 'Brak usera o podanym id',
      });
    }

    const secret = process.env.JWT_SECRET + user.pwdHash;

    // hash password and update
    try {
      const payload = verify(token, secret);
      await User.update(
        {
          id: payload.id,
        },
        {
          pwdHash: await hashPwd(password1),
        },
      );
      res.json({
        msg: 'Hasło zostało zmienione',
      });
    } catch (e) {
      return res.json({ msg: e.message });
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
