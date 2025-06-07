import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';
import { AuthHelper } from './auth.helper';
import { AuthValidator } from './auth.validator';
import { Response } from 'express';
import { AuthRedisHelper } from './auth-redis.helper';
import { ConfigService } from '@nestjs/config';
import { SafeUser } from '../user/user.interface';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly authHelper: AuthHelper,
    private readonly authValidator: AuthValidator,
    private readonly authRedisHelper: AuthRedisHelper,
    readonly configService: ConfigService,
  ) {}

  async login(response: Response, user: SafeUser): Promise<SafeUser> {
    const payload: UserPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      funcionarioId: user.funcionarioId,
      filialId: user.filialId,
      roleId: user.roleId,
    };

    try {
      const acess_token = this.authHelper.getJwtToken(payload, 'access');
      const refresh_token = this.authHelper.getJwtToken(payload, 'refresh');
      this.authValidator.checkJwtTokenSize(acess_token, user.id);
      this.authValidator.checkJwtTokenSize(refresh_token, user.id);
      this.authHelper.createCookieOfToken(response, acess_token, 'access');
      this.authHelper.createCookieOfToken(response, refresh_token, 'refresh');

      this.logger.log(`User ${user.email} logged in`);
    } catch (e) {
      this.logger.error('Error during login: ', e);
      throw e;
    }

    return user;
  }

  async validateUser(email: string, password: string): Promise<SafeUser> {
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Email ou senha incorretos.');
      }

      const isPasswordValid = await this.authValidator.checkPassword(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Email ou senha incorretos.');
      }

      const { password: passwordDb, ...safeUser } = user;

      return safeUser;
    } catch (e) {
      this.logger.error(`Erro ao validar usuário: ${e}`);

      if (
        e instanceof PrismaClientInitializationError ||
        e instanceof PrismaClientKnownRequestError
      ) {
        throw new InternalServerErrorException();
      }

      throw new UnauthorizedException('Email ou senha incorretos.');
    }
  }

  async logout(response: Response): Promise<void> {
    this.authHelper.clearCookiesOfToken(response);
  }

  async refresh(user: User, response: Response): Promise<User> {
    try {
      const payload: UserPayload = {
        userId: user.id,
        email: user.email,
        filialId: user.filialId,
        funcionarioId: user.funcionarioId,
        name: user.name,
        roleId: user.roleId,
      };

      const refresh_token = this.authHelper.getJwtToken(payload, 'refresh');
      const acess_token = this.authHelper.getJwtToken(payload, 'access');

      this.authValidator.checkJwtTokenSize(acess_token, user.id);
      this.authValidator.checkJwtTokenSize(refresh_token, user.id);

      this.authHelper.createCookieOfToken(response, acess_token, 'access');
      this.authHelper.createCookieOfToken(response, refresh_token, 'refresh');

      this.logger.log(`User ${user.email} refreshed token`);

      return { ...user };
    } catch (e) {
      this.logger.error(`Error during refresh, ${e}`);
      throw e;
    }
  }
}
