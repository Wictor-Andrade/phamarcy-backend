import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { Response } from 'express';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) response: Response,
    @Request() req: AuthRequest,
  ) {
    return this.authService.login(response, req.user);
  }

  @Get('me')
  getMe(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @IsPublic()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(
    @Request() req: AuthRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refresh(req.user, response);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    return this.authService.logout(response);
  }
}
