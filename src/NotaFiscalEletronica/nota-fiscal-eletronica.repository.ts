import { Injectable } from '@nestjs/common';
import { NotaFiscalEletronica, Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class NotaFiscalEletronicaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.NotaFiscalEletronicaCreateInput): Promise<NotaFiscalEletronica> {
    return this.prisma.notaFiscalEletronica.create({ data });
  }

  async findAll(): Promise<NotaFiscalEletronica[]> {
    return this.prisma.notaFiscalEletronica.findMany({
      include: {
        client: true,
        fornecedor: true,
        itens: true,
        comissao: true,
      },
    });
  }

  async findById(id: string): Promise<NotaFiscalEletronica | null> {
    return this.prisma.notaFiscalEletronica.findUnique({
      where: { id },
      include: {
        client: true,
        fornecedor: true,
        itens: true,
        comissao: true,
      },
    });
  }

  async update(id: string, data: Prisma.NotaFiscalEletronicaUpdateInput): Promise<NotaFiscalEletronica> {
    return this.prisma.notaFiscalEletronica.update({ where: { id }, data });
  }

  async delete(id: string): Promise<NotaFiscalEletronica> {
    return this.prisma.notaFiscalEletronica.delete({ where: { id } });
  }
}
