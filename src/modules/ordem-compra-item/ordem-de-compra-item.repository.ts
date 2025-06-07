import { Injectable } from '@nestjs/common';
import { OrdemDeCompraItem, Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class OrdemDeCompraItemRepository {
  constructor(private prisma: PrismaService) {}

  create(
    data: Prisma.OrdemDeCompraItemCreateInput,
  ): Promise<OrdemDeCompraItem> {
    return this.prisma.ordemDeCompraItem.create({ data });
  }

  findAll(): Promise<OrdemDeCompraItem[]> {
    return this.prisma.ordemDeCompraItem.findMany();
  }

  findOne(id: string): Promise<OrdemDeCompraItem | null> {
    return this.prisma.ordemDeCompraItem.findUnique({ where: { id } });
  }

  update(
    id: string,
    data: Prisma.OrdemDeCompraItemUpdateInput,
  ): Promise<OrdemDeCompraItem> {
    return this.prisma.ordemDeCompraItem.update({ where: { id }, data });
  }

  remove(id: string): Promise<OrdemDeCompraItem> {
    return this.prisma.ordemDeCompraItem.delete({ where: { id } });
  }
}
