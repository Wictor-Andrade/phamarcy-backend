import { Injectable } from '@nestjs/common';
import { UpdateActiveIngredientDto } from './dto/update-active-ingredient.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateActiveIngredientStepOneDto } from './dto/create-active-ingredient-step-one.dto';
import { PrismaService } from '@core/prisma/prisma.service';

@ApiTags('Principio Ativo')
@Injectable()
export class ActiveIngredientRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateActiveIngredientStepOneDto) {
    return this.prisma.activeIngredient.create({ data });
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
