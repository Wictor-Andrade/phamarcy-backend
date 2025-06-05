import { Injectable } from '@nestjs/common';
import { CreateMedicamentoDto } from './dto/create-medicamento.dto';
import { UpdateMedicamentoDto } from './dto/update-medicamento.dto';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class MedicamentoRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMedicamentoDto) {
    return this.prisma.medicamento.create({ data: dto });
  }

  findAll() {
    return this.prisma.medicamento.findMany();
  }

  findOne(id: string) {
    return this.prisma.medicamento.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateMedicamentoDto) {
    return this.prisma.medicamento.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.medicamento.delete({ where: { id } });
  }
}
