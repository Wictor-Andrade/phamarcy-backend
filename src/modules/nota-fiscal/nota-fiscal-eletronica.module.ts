import { Module } from '@nestjs/common';
import { NotaFiscalEletronicaService } from './nota-fiscal-eletronica.service';
import { NotaFiscalEletronicaController } from './nota-fiscal-eletronica.controller';
import { NotaFiscalEletronicaRepository } from './nota-fiscal-eletronica.repository';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NotaFiscalEletronicaController],
  providers: [NotaFiscalEletronicaService, NotaFiscalEletronicaRepository],
})
export class NotaFiscalEletronicaModule {}
