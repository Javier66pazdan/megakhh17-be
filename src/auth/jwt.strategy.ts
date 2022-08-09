import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { User } from '../user/user.entity';
import { Request } from 'express';

export interface JwtPayload {
  id: string;
}

function cookieExtractor(req: Request): null | string {
  console.log(req.cookies);
  return req && req.cookies ? req.cookies?.jwt ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: JwtPayload, done: (error, user) => void) {
    if (!payload || !payload.id) {
      return done(new UnauthorizedException(), false);
    }

    const user = await User.findOne({ where: { currentTokenId: payload.id } });
    if (!user) {
      return done(new UnauthorizedException(), false);
    }

    done(null, user);
  }
}
