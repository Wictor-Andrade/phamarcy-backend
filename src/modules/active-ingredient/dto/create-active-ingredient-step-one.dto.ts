import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { OriginType } from '@prisma/client';

export class CreateActiveIngredientStepOneDto {
  @ApiProperty({
    example: 'Ibuprofeno',
    description: 'Nome do ingrediente ativo',
  })
  @IsString()
  @MaxLength(24)
  name: string;

  @ApiProperty({
    example: 'Anti-inflamatório não esteroide',
    description: 'Descrição do ingrediente ativo',
  })
  @IsString()
  @MaxLength(254)
  description: string;

  @ApiProperty({
    example: 'Evitar em pacientes com úlcera gástrica',
    description: 'Contraindicação do ingrediente',
  })
  @IsString()
  @MaxLength(254)
  contraindication: string;

  @ApiProperty({
    enum: OriginType,
    example: OriginType.SINTETICA,
    description: 'Origem do ingrediente ativo',
  })
  @IsEnum(OriginType)
  origin: OriginType;
}
