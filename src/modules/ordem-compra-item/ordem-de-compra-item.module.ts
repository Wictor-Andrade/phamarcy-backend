import { Module } from '@nestjs/common';
import { OrdemDeCompraItemService } from './ordem-de-compra-item.service';
import { OrdemDeCompraItemController } from './ordem-de-compra-item.controller';
import { OrdemDeCompraItemRepository } from './ordem-de-compra-item.repository';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OrdemDeCompraItemController],
  providers: [OrdemDeCompraItemService, OrdemDeCompraItemRepository],
  exports: [OrdemDeCompraItemService],
})
export class OrdemDeCompraItemModule {}
