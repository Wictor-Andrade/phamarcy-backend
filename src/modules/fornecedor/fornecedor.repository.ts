import { Injectable } from '@nestjs/common';
import { Fornecedor, Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class FornecedorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.FornecedorCreateInput): Promise<Fornecedor> {
    return this.prisma.fornecedor.create({ data });
  }

  async findAll(): Promise<Fornecedor[]> {
    return this.prisma.fornecedor.findMany();
  }

  async findById(id: string): Promise<Fornecedor | null> {
    return this.prisma.fornecedor.findUnique({ where: { id } });
  }

  async update(
    id: string,
    data: Prisma.FornecedorUpdateInput,
  ): Promise<Fornecedor> {
    return this.prisma.fornecedor.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Fornecedor> {
    return this.prisma.fornecedor.delete({ where: { id } });
  }
}
