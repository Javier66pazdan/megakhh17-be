import { Controller, Post, Body, Res } from '@nestjs/common';
import { PasswordService } from './password.service';
import { Response } from 'express';
import { PasswordRecovery, PasswordReset } from './entities/password.entity';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('/recovery')
  async passwordRecovery(
    @Body() req: PasswordRecovery,
    @Res() res: Response,
  ): Promise<string> {
    return this.passwordService.passwordRecovery(req, res);
  }

  @Post('/reset')
  async passwordReset(
    @Body() req: PasswordReset,
    @Res() res: Response,
  ): Promise<string> {
    return this.passwordService.passwordReset(req, res);
  }
}
