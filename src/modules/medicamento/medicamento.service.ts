import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicamentoRepository } from './medicamento.repository';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';

@Injectable()
export class MedicamentoService {
  constructor(private readonly repo: MedicamentoRepository) {}

  create(dto: CreateMedicamentoDto) {
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

  async update(id: string, dto: UpdateMedicamentoDto) {
    await this.findOne(id);
    return this.repo.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repo.remove(id);
  }
}
