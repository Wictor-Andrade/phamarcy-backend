import { IsString, IsUUID, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateActiveIngredientDto {
  @ApiProperty({ example: 'Ibuprofeno', description: 'Nome do ingrediente ativo' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 'Anti-inflamatório não esteroide', description: 'Descrição do ingrediente ativo' })
  @IsString()
  descricao: string;

  @ApiProperty({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851', description: 'ID do medicamento genérico relacionado' })
  @IsUUID()
  idMedicamentoGenerico: string;

  @ApiProperty({ example: 10, description: 'Estoque mínimo permitido' })
  @IsInt()
  @Min(0)
  estoqueMin: number;

  @ApiProperty({ example: 50, description: 'Estoque ideal' })
  @IsInt()
  @Min(0)
  estoqueIdeal: number;

  @ApiProperty({ example: 100, description: 'Estoque máximo permitido' })
  @IsInt()
  @Min(0)
  estoqueMax: number;
}
