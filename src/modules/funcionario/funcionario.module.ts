import { Module } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioRepository } from './funcionario.repository';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FuncionarioController],
  providers: [FuncionarioService, FuncionarioRepository],
})
export class FuncionarioModule {}
