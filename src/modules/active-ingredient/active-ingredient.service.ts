import { Injectable, NotFoundException } from '@nestjs/common';
import { ActiveIngredientRepository } from './active-ingredient.repository';
import { UpdateActiveIngredientDto } from './dto/update-active-ingredient.dto';
import { CreateActiveIngredientStepOneDto } from './dto/create-active-ingredient-step-one.dto';

@Injectable()
export class ActiveIngredientService {
  constructor(private readonly repo: ActiveIngredientRepository) {}

  create(dto: CreateActiveIngredientStepOneDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const result = await this.repo.findOne(id);
    if (!result)
      throw new NotFoundException('Ingrediente ativo não encontrado');
    return result;
  }

  async update(id: string, dto: UpdateActiveIngredientDto) {
    await this.findOne(id);
    return this.repo.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repo.remove(id);
  }
}
