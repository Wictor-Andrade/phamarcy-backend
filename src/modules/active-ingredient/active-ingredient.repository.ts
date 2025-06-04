import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class ActiveIngredientRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.activeIngredient.create({ data });
  }

  findAll() {
    return this.prisma.activeIngredient.findMany();
  }

  findById(id: string) {
    return this.prisma.activeIngredient.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.activeIngredient.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.activeIngredient.delete({ where: { id } });
  }
}
