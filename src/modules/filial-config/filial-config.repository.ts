import { Injectable } from '@nestjs/common';
import { Config, Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class FilialConfigRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ConfigCreateInput): Promise<Config> {
    return this.prisma.config.create({ data });
  }

  async findAll(): Promise<Config[]> {
    return this.prisma.config.findMany();
  }

  async findById(id: string): Promise<Config | null> {
    return this.prisma.config.findUnique({ where: { id } });
  }

  async findByFilialId(filialId: string): Promise<Config | null> {
    return this.prisma.config.findUnique({ where: { filialId } });
  }

  async update(id: string, data: Partial<Config>): Promise<Config> {
    return this.prisma.config.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Config> {
    return this.prisma.config.delete({ where: { id } });
  }
}
