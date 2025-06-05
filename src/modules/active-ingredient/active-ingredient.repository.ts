import { Injectable } from '@nestjs/common';
import { CreateActiveIngredientDto } from './dto/create-active-ingredient.dto';
import { UpdateActiveIngredientDto } from './dto/update-active-ingredient.dto';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class ActiveIngredientRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateActiveIngredientDto) {
    return this.prisma.activeIngredient.create({ data: dto });
  }

  findAll() {
    return this.prisma.activeIngredient.findMany();
  }

  findOne(id: string) {
    return this.prisma.activeIngredient.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateActiveIngredientDto) {
    return this.prisma.activeIngredient.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.activeIngredient.delete({ where: { id } });
  }
}
