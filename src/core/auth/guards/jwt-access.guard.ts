import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';
import { JwtService } from '@nestjs/jwt';
import { AuthHelper } from '../auth.helper';
import { ConfigService } from '@nestjs/config';
import { JwtSignedFields } from '../auth.interface';

@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAccessGuard.name);
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly authHelper: AuthHelper,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token = this.authHelper.extractTokenFromCookie(req, 'access');
    const jwtSecret = this.configService.get<string>('jwt.access.secret');
    if(!token) throw new UnauthorizedException();
    try {

      const jwtSignedFields =
        await this.jwtService.verifyAsync<JwtSignedFields>(token, {
          secret: jwtSecret,
        });

      req.user = {
        id: jwtSignedFields.userId,
        email: jwtSignedFields.email,
        name: jwtSignedFields.name,
        filialId: jwtSignedFields.filialId,
        funcionarioId: jwtSignedFields.funcionarioId,
        roleId: jwtSignedFields.roleId,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
