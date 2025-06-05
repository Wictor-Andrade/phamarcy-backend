import { Injectable, NotFoundException } from '@nestjs/common';
import { FilialConfigRepository } from './filial-config.repository';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FilialConfigService {
  constructor(private readonly repository: FilialConfigRepository) {}

  async create(dto: CreateConfigDto) {
    const data: Prisma.ConfigCreateInput = {
      filial: {
        connect: {
          id: dto.filialId,
        },
      },
      defaultEstoqueMin: dto.defaultEstoqueMin,
      defaultEstoqueIdeal: dto.defaultEstoqueIdeal,
      defaultEstoqueMax: dto.defaultEstoqueMax,
      jobRecurrency: dto.jobRecurrency,
    };
    return this.repository.create(data);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const config = await this.repository.findById(id);
    if (!config) throw new NotFoundException('Config not found');
    return config;
  }

  async findByFilialId(filialId: string) {
    const config = await this.repository.findByFilialId(filialId);
    if (!config)
      throw new NotFoundException('Config not found for this filial');
    return config;
  }

  async update(id: string, dto: UpdateConfigDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.delete(id);
  }
}
