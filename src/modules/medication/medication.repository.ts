import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { PrismaService } from '@core/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class MedicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateMedicationDto) {
    return this.prisma.medication.create({ data });
  }

  findAll() {
    return this.prisma.medication.findMany({
      include: {
        ActiveIngredient: true,
      },
    });
  }

  findAllWhere(where: Prisma.MedicationWhereInput) {
    return this.prisma.medication.findMany({
      where,
      include: {
        ActiveIngredient: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.medication.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateMedicationDto) {
    return this.prisma.medication.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.medication.delete({ where: { id } });
  }
}
