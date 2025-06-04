import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthHelper } from '../auth.helper';
import { ConfigService } from '@nestjs/config';
import { JwtSignedFields } from '../auth.interface';
import { RefreshTokenIsInvalid } from '../auth.exception';
import { AuthRedisHelper } from '../auth-redis.helper';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtRefreshGuard.name);

  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly authHelper: AuthHelper,
    private readonly configService: ConfigService,
    private readonly authRedisHelper: AuthRedisHelper,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const refreshToken = this.authHelper.extractTokenFromCookie(req, 'refresh');
    if (!refreshToken) {
      throw new RefreshTokenIsInvalid();
    }

    const jwtRefreshSecret =
      this.configService.get<string>('jwt.refresh.secret');
    try {
      const jwtSignedFields =
        await this.jwtService.verifyAsync<JwtSignedFields>(refreshToken, {
          secret: jwtRefreshSecret,
        });

      if (await this.authRedisHelper.isTokenBlacklisted(refreshToken)) {
        throw new RefreshTokenIsInvalid('Refresh token is invalid.');
      } else {
        await this.authRedisHelper.addToBlacklist(refreshToken);
      }

      req.user = {
        id: jwtSignedFields.userId,
        email: jwtSignedFields.email,
        name: jwtSignedFields.name,
        filialId: jwtSignedFields.filialId,
        funcionarioId: jwtSignedFields.funcionarioId,
        roleId: jwtSignedFields.roleId,
      };
    } catch (e) {
      this.logger.error('Error verifying token', e);
      throw new RefreshTokenIsInvalid();
    }

    return true;
  }
}
