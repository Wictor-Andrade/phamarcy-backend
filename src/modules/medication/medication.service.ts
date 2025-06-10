import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicationRepository } from './medication.repository';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { FilterMedicamentoDto } from '@modules/medication/dto/filter-medication.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MedicationService {
  constructor(private readonly repo: MedicationRepository) {}

  create(dto: CreateMedicationDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const medicamento = await this.repo.findOne(id);
    if (!medicamento) throw new NotFoundException('Medicamento não encontrado');
    return medicamento;
  }

  async filter(dto: FilterMedicamentoDto) {
    const where: Prisma.MedicationWhereInput = {};

    if (dto.search) {
      where.OR = [{ name: { contains: dto.search, mode: 'insensitive' } }];
    }

    if (dto.idActiveIngredient) {
      where.activeIngredientId = dto.idActiveIngredient;
    }

    return this.repo.findAllWhere(where);
  }

  async update(id: string, dto: UpdateMedicationDto) {
    await this.findOne(id);
    return this.repo.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repo.remove(id);
  }
}
