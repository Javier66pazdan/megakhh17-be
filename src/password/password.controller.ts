import { Controller, Post, Body, Res } from '@nestjs/common';
import { PasswordService } from './password.service';
import { Response } from 'express';
import { PasswordRecovery } from './entities/password.entity';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('/recovery')
  async passwordRecovery(@Body() req: PasswordRecovery): Promise<string> {
    return this.passwordService.passwordRecovery(req);
  }
}
