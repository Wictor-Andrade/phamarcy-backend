import { UnauthorizedException } from '@nestjs/common';

export class RefreshTokenIsInvalid extends UnauthorizedException {
  constructor(message = 'O refresh token é inválido.') {
    super(message);
  }

  getResponse() {
    return {
      statusCode: 498,
      message: this.message, //
      error: 'Invalid refresh token',
      timestamp: new Date().toISOString(),
    };
  }
}
