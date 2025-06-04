import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { HashHelper } from '../../common/helpers/hash.helper';

@Injectable()
export class AuthValidator {
  private readonly logger = new Logger(AuthValidator.name);

  constructor(private readonly hashHelper: HashHelper) {}

  async checkPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await this.hashHelper.compare(hashedPassword, password);
  }

  checkJwtTokenSize(jwtToken: string, userLoginMethod?: string): void {
    if (Buffer.byteLength(jwtToken) / 1024 > 4) {
      this.logger.error(
        `O token JWT é maior que 4KB - UserLogin: ${userLoginMethod ?? '?'}`,
      );
      throw new UnauthorizedException(
        'Problemas com o login, contate o administrador do sistema (token).',
      );
    }
  }
}
