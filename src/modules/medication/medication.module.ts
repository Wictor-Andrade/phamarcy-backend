import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { MedicationRepository } from './medication.repository';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MedicationController],
  providers: [MedicationService, MedicationRepository],
})
export class MedicationModule {}
