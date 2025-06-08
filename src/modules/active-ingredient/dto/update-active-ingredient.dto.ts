import { IsEnum, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { OriginType } from '@prisma/client';

export class UpdateActiveIngredientDto {
  @ApiPropertyOptional({
    example: 'Paracetamol',
    description: 'Nome do princípio ativo',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Analgésico usado para dores leves e febre',
    description: 'Descrição do princípio ativo',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'Não usar em casos de alergia a paracetamol',
    description: 'Contraindicações',
  })
  @IsOptional()
  @IsString()
  contraindication?: string;

  @ApiPropertyOptional({
    enum: OriginType,
    description: 'Origem do princípio ativo',
  })
  @IsOptional()
  @IsEnum(OriginType)
  origin?: OriginType;

  @ApiPropertyOptional({
    example: 10,
    description: 'Estoque mínimo recomendado',
  })
  @IsOptional()
  @IsInt()
  estoqueMin?: number;

  @ApiPropertyOptional({
    example: 50,
    description: 'Estoque ideal recomendado',
  })
  @IsOptional()
  @IsInt()
  estoqueIdeal?: number;

  @ApiPropertyOptional({
    example: 100,
    description: 'Estoque máximo recomendado',
  })
  @IsOptional()
  @IsInt()
  estoqueMax?: number;

  @ApiPropertyOptional({
    format: 'uuid',
    description: 'ID do medicamento genérico associado',
  })
  @IsOptional()
  @IsUUID()
  idMedicamentoGenerico?: string;
}
