import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../core/prisma/prisma.service';
import { CreatePromocaoDto } from './dto/create-promocao.dto';

@Injectable()
export class PromocaoRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreatePromocaoDto) {
    return this.prisma.promocao.create({ data });
  }

  findAll() {
    return this.prisma.promocao.findMany();
  }

  findOne(id: string) {
    return this.prisma.promocao.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.PromocaoUpdateInput) {
    return this.prisma.promocao.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.promocao.delete({ where: { id } });
  }
}
