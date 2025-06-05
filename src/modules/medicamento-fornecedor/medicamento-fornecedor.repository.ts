import { Injectable } from '@nestjs/common';
import { MedicamentoFornecedor, Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class MedicamentoFornecedorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Prisma.MedicamentoFornecedorCreateInput,
  ): Promise<MedicamentoFornecedor> {
    return this.prisma.medicamentoFornecedor.create({ data });
  }

  async findAll(): Promise<MedicamentoFornecedor[]> {
    return this.prisma.medicamentoFornecedor.findMany();
  }

  async findById(id: string): Promise<MedicamentoFornecedor | null> {
    return this.prisma.medicamentoFornecedor.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: Prisma.MedicamentoFornecedorUpdateInput,
  ): Promise<MedicamentoFornecedor> {
    return this.prisma.medicamentoFornecedor.update({ where: { id }, data });
  }

  async delete(id: string): Promise<MedicamentoFornecedor> {
    return this.prisma.medicamentoFornecedor.delete({ where: { id } });
  }
}
