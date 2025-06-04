import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class FuncionarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.funcionario.findMany();
  }

  findById(id: string) {
    return this.prisma.funcionario.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.funcionario.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.funcionario.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.funcionario.delete({ where: { id } });
  }
}
