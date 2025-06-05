import { Module } from '@nestjs/common';
import { MedicamentoFornecedorService } from './medicamento-fornecedor.service';
import { MedicamentoFornecedorController } from './medicamento-fornecedor.controller';
import { MedicamentoFornecedorRepository } from './medicamento-fornecedor.repository';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MedicamentoFornecedorController],
  providers: [MedicamentoFornecedorService, MedicamentoFornecedorRepository],
})
export class MedicamentoFornecedorModule {}
