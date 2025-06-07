import { IsDateString, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromocaoDto {
  @ApiProperty({
    example: 'uuid-do-medicamento',
    description: 'ID do medicamento',
  })
  @IsUUID()
  idMedicamento: string;

  @ApiProperty({
    example: 'uuid-do-ingrediente-ativo',
    description: 'ID do ingrediente ativo',
  })
  @IsUUID()
  activeIngredientId: string;

  @ApiProperty({ example: 10, description: 'Porcentagem de desconto aplicada' })
  @IsNumber()
  @Min(0)
  porcentagemDesconto: number;

  @ApiProperty({
    example: '2025-06-01T00:00:00.000Z',
    description: 'Data de início da promoção',
  })
  @IsDateString()
  dataInicio: string;

  @ApiProperty({
    example: '2025-06-10T00:00:00.000Z',
    description: 'Data de fim da promoção',
  })
  @IsDateString()
  dataFim: string;
}
