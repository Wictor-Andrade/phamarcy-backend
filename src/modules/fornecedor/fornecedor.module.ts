import { Module } from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { FornecedorController } from './fornecedor.controller';
import { FornecedorRepository } from './fornecedor.repository';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FornecedorController],
  providers: [FornecedorService, FornecedorRepository],
})
export class FornecedorModule {}
