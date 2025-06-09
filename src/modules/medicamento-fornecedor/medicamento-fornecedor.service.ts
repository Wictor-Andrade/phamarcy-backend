import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicamentoFornecedorRepository } from './medicamento-fornecedor.repository';
import { Prisma } from '@prisma/client';
import { CreateMedicamentoFornecedorDto } from './dto/create-medicamento-fornecedor.dto';
import { UpdateMedicamentoFornecedorDto } from './dto/update-medicamento-fornecedor.dto';

@Injectable()
export class MedicamentoFornecedorService {
  constructor(private readonly repository: MedicamentoFornecedorRepository) {}

  async create(dto: CreateMedicamentoFornecedorDto) {
    const data: Prisma.MedicamentoFornecedorCreateInput = {
      medication: { connect: { id: dto.medicamentoId } },
      fornecedor: { connect: { id: dto.fornecedorId } },
    };
    return this.repository.create(data);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundException('MedicamentoFornecedor não encontrado');
    }
    return entity;
  }

  async update(id: string, dto: UpdateMedicamentoFornecedorDto) {
    await this.findOne(id);

    const data: Prisma.MedicamentoFornecedorUpdateInput = {
      medication: dto.medicamentoId
        ? { connect: { id: dto.medicamentoId } }
        : undefined,
      fornecedor: dto.fornecedorId
        ? { connect: { id: dto.fornecedorId } }
        : undefined,
    };

    return this.repository.update(id, data);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.delete(id);
  }
}
