import { Module } from '@nestjs/common';
import { PromocaoController } from './promocao.controller';
import { PromocaoService } from './promocao.service';
import { PromocaoRepository } from './promocao.repository';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PromocaoController],
  providers: [PromocaoService, PromocaoRepository],
})
export class PromocaoModule {}
