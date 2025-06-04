import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.client.findMany();
  }

  findById(id: string) {
    return this.prisma.client.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.client.create({ data });
  }

  update(id: string, data: any) {
    return this.prisma.client.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.client.delete({ where: { id } });
  }
}
