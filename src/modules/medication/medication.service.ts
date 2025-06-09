import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicationRepository } from './medication.repository';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';

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

  async update(id: string, dto: UpdateMedicationDto) {
    await this.findOne(id);
    return this.repo.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repo.remove(id);
  }
}
