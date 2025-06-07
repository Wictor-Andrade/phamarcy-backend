import { PartialType } from '@nestjs/mapped-types';
import { CreateActiveIngredientStepOneDto } from './create-active-ingredient-step-one.dto';

export class UpdateActiveIngredientDto extends PartialType(
  CreateActiveIngredientStepOneDto,
) {}
