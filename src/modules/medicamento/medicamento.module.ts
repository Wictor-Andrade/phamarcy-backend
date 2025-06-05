import { Module } from '@nestjs/common';
import { MedicamentoService } from './medicamento.service';
import { MedicamentoController } from './medicamento.controller';
import { MedicamentoRepository } from './medicamento.repository';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MedicamentoController],
  providers: [MedicamentoService, MedicamentoRepository],
})
export class MedicamentoModule {}
