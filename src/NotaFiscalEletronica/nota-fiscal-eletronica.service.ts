import { Injectable, NotFoundException } from '@nestjs/common';
import { NotaFiscalEletronicaRepository } from './nota-fiscal-eletronica.repository';
import { Prisma } from '@prisma/client';
import { CreateNotaFiscalEletronicaDto } from './dto/create-nota-fiscal-eletronica.dto';
import { UpdateNotaFiscalEletronicaDto } from './dto/update-nota-fiscal-eletronica.dto';

@Injectable()
export class NotaFiscalEletronicaService {
  constructor(private readonly repository: NotaFiscalEletronicaRepository) {}

  async create(dto: CreateNotaFiscalEletronicaDto) {
    const data: Prisma.NotaFiscalEletronicaCreateInput = {
      tipoMovimento: dto.tipoMovimento,
      fornecedor: { connect: { id: dto.fornecedorId } },
      client: dto.clientId ? { connect: { id: dto.clientId } } : undefined,
    };
    return this.repository.create(data);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException('Nota Fiscal Eletrônica não encontrada');
    }
    return entity;
  }

  async update(id: string, dto: UpdateNotaFiscalEletronicaDto) {
    await this.findOne(id);

    const data: Prisma.NotaFiscalEletronicaUpdateInput = {
      tipoMovimento: dto.tipoMovimento,
      fornecedor: dto.fornecedorId
        ? { connect: { id: dto.fornecedorId } }
        : undefined,
      client: dto.clientId ? { connect: { id: dto.clientId } } : undefined,
    };

    return this.repository.update(id, data);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.delete(id);
  }
}
