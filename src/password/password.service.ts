import { Injectable } from '@nestjs/common';
import { PasswordRecovery } from './entities/password.entity';

@Injectable()
export class PasswordService {
  passwordRecovery(req: PasswordRecovery): string {
    // chack is user in db
    console.log(req);

    return 'ok';
  }
}
