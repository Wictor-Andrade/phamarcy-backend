import { IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterMedicamentoDto {
  @ApiPropertyOptional({
    description: 'ID do princípio ativo (Active Ingredient)',
    format: 'uuid',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsOptional()
  @IsUUID()
  idActiveIngredient?: string;

  @ApiPropertyOptional({
    description: 'Texto de busca livre (nome, descrição, etc)',
    example: 'dipirona',
  })
  @IsOptional()
  @IsString()
  search?: string;
}
