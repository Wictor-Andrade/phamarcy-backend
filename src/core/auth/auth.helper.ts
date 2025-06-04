import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './models/UserPayload';
import { JwtUnsignedFields } from './auth.interface';
import { ConfigService } from '@nestjs/config';
import * as ms from 'ms';
import { Request, Response } from 'express';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AuthHelper {
  constructor(
    readonly jwtService: JwtService,
    readonly configService: ConfigService,
  ) {}

  //TODO: otimizar esses metodos para que publico só tenhamos um metodo que chama os privados assim evitando repetição de codigo, a parte que cria o cookie pode gerar os dois sempre, já que sempre será assim.
  getJwtToken(userPayload: UserPayload, type: 'access' | 'refresh'): string {
    const tokenPayloadUnsigned = this.userPayloadToJwtUnsignedFields(
      userPayload,
      type,
    );

    const expiration = this.configService.get<ms.StringValue>(
      type === 'access' ? 'jwt.access.expiresIn' : 'jwt.refresh.expiresIn',
    );

    const secret = this.configService.get<string>(
      type === 'access' ? 'jwt.access.secret' : 'jwt.refresh.secret',
    );

    return this.jwtService.sign(tokenPayloadUnsigned, {
      secret,
      expiresIn: expiration,
    });
  }

  userPayloadToJwtUnsignedFields(
    userPayload: UserPayload,
    type: 'access' | 'refresh',
  ): JwtUnsignedFields {
    return {
      ...userPayload,
      sub: userPayload.userId,
      type,
    };
  }

  createCookieOfToken(
    response: Response,
    token: string,
    type: 'access' | 'refresh',
  ) {
    const acessExpiration = this.configService.get<ms.StringValue>('jwt.access.expiresIn') || '1d';
    const refreshExpiration = this.configService.get<ms.StringValue>('jwt.refresh.expiresIn') || '1d';

    type === 'access'
      ? this.createAcessTokenCookie(response, token, ms(acessExpiration))
      : this.createRefreshTokenCookie(response, token, ms(refreshExpiration));
  }

  extractTokenFromCookie(
    req: Request,
    type: 'access' | 'refresh',
  ): string | null {
    const cookieTokenName =
      type === 'access'
        ? this.configService.get<string>('jwt.access.cookieName')
        : this.configService.get<string>('jwt.refresh.cookieName');

    if (!cookieTokenName) {
      throw new Error(`Cookie name for ${type} is missing in config`);
    }

    return req?.cookies ? req.signedCookies[cookieTokenName] : null;
  }

  clearCookiesOfToken(response: Response) {
    this.createAcessTokenCookie(response, '', 0);
    this.createRefreshTokenCookie(response, '', 0);
  }

  private createRefreshTokenCookie(
    response: Response,
    value: string,
    expiresMs: number,
  ) {
    const cookieTokenName = this.configService.get<string>(
      'jwt.refresh.cookieName',
    );

    if(!cookieTokenName) throw new InternalServerErrorException();

    const domain = this.configService.get<string>('cookie.domain');
    const secure = this.configService.get<boolean>('cookie.secure');

    response.cookie(cookieTokenName, value, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      domain,
      signed: true,
      maxAge: expiresMs,
    });
  }

  private createAcessTokenCookie(
    response: Response,
    value: string,
    expiresMs: number,
  ) {
    const cookieTokenName = this.configService.get<string>(
      'jwt.access.cookieName',
    );

    if(!cookieTokenName) throw new InternalServerErrorException();

    const domain = this.configService.get<string>('cookie.domain');
    const secure = this.configService.get<boolean>('cookie.secure');

    response.cookie(cookieTokenName, value, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      domain,
      signed: true,
      maxAge: expiresMs,
    });
  }
}
