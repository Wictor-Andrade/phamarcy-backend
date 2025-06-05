import { Module } from '@nestjs/common';
import { ActiveIngredientController } from './active-ingredient.controller';
import { ActiveIngredientService } from './active-ingredient.service';
import { ActiveIngredientRepository } from './active-ingredient.repository';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ActiveIngredientController],
  providers: [ActiveIngredientService, ActiveIngredientRepository],
})
export class ActiveIngredientModule {}
