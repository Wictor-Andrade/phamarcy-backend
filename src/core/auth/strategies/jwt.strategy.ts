import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from '../models/UserFromJwt';
import { UserPayload } from '../models/UserPayload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) =>
          req.cookies[this.configService.get<string>('jwt.access.cookieName')!],
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.access.secret')!,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    return {
      id: payload.userId,
      filialId: payload.filialId,
      email: payload.email,
      name: payload.name,
    };
  }
}
