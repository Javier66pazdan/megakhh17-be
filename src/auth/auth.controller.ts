import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async userRegister(
    @Body() req: AuthLoginDto,
    @Res() res: Response,
  ): Promise<AuthLoginDto> {
    return this.authService.login(req, res);
  }

  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@UserObj() user: User, @Res() res: Response) {
    console.log('cos', user);
    return this.authService.logout(user, res);
  }

  @Get('/message')
  @UseGuards(AuthGuard('jwt'))
  getHello(): string {
    return this.authService.getHello();
  }
}
