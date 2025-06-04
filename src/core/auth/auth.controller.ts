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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login com e-mail e senha' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  login(
    @Res({ passthrough: true }) response: Response,
    @Request() req: AuthRequest,
  ) {
    return this.authService.login(response, req.user);
  }

  @Get('me')
  @ApiOperation({ summary: 'Retorna o usuário autenticado' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: 'User' })
  getMe(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @IsPublic()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Renova o token de acesso' })
  @ApiResponse({ status: 201, description: 'Token renovado com sucesso' })
  @ApiResponse({ status: 401, description: 'Refresh token inválido' })
  refresh(
    @Request() req: AuthRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refresh(req.user, response);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Desloga o usuário e limpa os cookies' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
  logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    return this.authService.logout(response);
  }
}
