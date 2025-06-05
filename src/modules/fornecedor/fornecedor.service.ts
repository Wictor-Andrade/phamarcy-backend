import { Injectable, NotFoundException } from '@nestjs/common';
import { FornecedorRepository } from './fornecedor.repository';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FornecedorService {
  constructor(private readonly repository: FornecedorRepository) {}

  async create(dto: CreateFornecedorDto) {
    const data: Prisma.FornecedorCreateInput = {
      nome: dto.nome,
      cnpj: dto.cnpj,
      telefone: dto.telefone,
    };
    return this.repository.create(data);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const fornecedor = await this.repository.findById(id);
    if (!fornecedor) {
      throw new NotFoundException('Fornecedor não encontrado');
    }
    return fornecedor;
  }

  async update(id: string, dto: UpdateFornecedorDto) {
    await this.findOne(id);

    const data: Prisma.FornecedorUpdateInput = {
      nome: dto.nome,
      cnpj: dto.cnpj,
      telefone: dto.telefone,
    };

    return this.repository.update(id, data);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.delete(id);
  }
}
