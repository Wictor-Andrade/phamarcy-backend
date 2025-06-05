import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateConfigDto {
  @ApiProperty({ description: 'ID da filial', format: 'uuid' })
  @IsUUID()
  filialId: string;

  @ApiProperty({ description: 'Estoque mínimo padrão', example: 10 })
  @IsInt()
  @Min(0)
  defaultEstoqueMin: number;

  @ApiProperty({ description: 'Estoque ideal padrão', example: 20 })
  @IsInt()
  @Min(0)
  defaultEstoqueIdeal: number;

  @ApiProperty({ description: 'Estoque máximo padrão', example: 30 })
  @IsInt()
  @Min(0)
  defaultEstoqueMax: number;

  @ApiProperty({ description: 'Recorrência de jobs (em minutos)', example: 60 })
  @IsInt()
  @Min(1)
  jobRecurrency: number;
}
