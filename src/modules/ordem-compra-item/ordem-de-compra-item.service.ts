import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdemDeCompraItemRepository } from './ordem-de-compra-item.repository';
import { CreateOrdemDeCompraItemDto } from './dto/create-ordem-de-compra-item.dto';
import { UpdateOrdemDeCompraItemDto } from './dto/update-ordem-de-compra-item.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdemDeCompraItemService {
  constructor(private readonly repository: OrdemDeCompraItemRepository) {}

  async create(createDto: CreateOrdemDeCompraItemDto) {
    const data: Prisma.OrdemDeCompraItemCreateInput = {
      ordemDeCompra: { connect: { id: createDto.ordemDeCompraId } },
      medicamento: { connect: { id: createDto.medicamentoId } },
    };
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const item = await this.repository.findOne(id);
    if (!item) throw new NotFoundException(`Item ${id} não encontrado`);
    return item;
  }

  async update(id: string, updateDto: UpdateOrdemDeCompraItemDto) {
    await this.findOne(id);
    const data: Prisma.OrdemDeCompraItemUpdateInput = {
      id: updateDto.ordemDeCompraId,
    };
    return this.repository.update(id, data);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}
