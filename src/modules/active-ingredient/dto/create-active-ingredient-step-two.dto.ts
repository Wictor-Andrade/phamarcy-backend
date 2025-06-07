import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateActiveIngredientStepTwoDto {
  @ApiPropertyOptional({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'ID do medicamento genérico relacionado',
  })
  @IsUUID()
  @IsOptional()
  idMedicamentoGenerico: string;

  @ApiPropertyOptional({ example: 10, description: 'Estoque mínimo permitido' })
  @IsInt()
  @Min(0)
  @IsOptional()
  estoqueMin: number;

  @ApiPropertyOptional({ example: 50, description: 'Estoque ideal' })
  @IsInt()
  @Min(0)
  estoqueIdeal: number;

  @ApiPropertyOptional({
    example: 100,
    description: 'Estoque máximo permitido',
  })
  @IsInt()
  @Min(0)
  estoqueMax: number;
}
