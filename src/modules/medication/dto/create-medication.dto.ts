import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DosageForm, DosageUnit, OriginType } from '@prisma/client';

export class CreateMedicationDto {
  @ApiProperty({
    example: 'Paracetamol',
    description: 'Nome comercial do medicamento',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'e263bd68-faf7-4c9f-9e02-2aab2dcaa90c',
    description: 'UUID do ingrediente ativo relacionado',
  })
  @IsUUID()
  activeIngredientId: string;

  @ApiProperty({
    enum: OriginType,
    example: OriginType.SINTETICA,
    description: 'Origem do medicamento (sintética, natural ou biotecnológica)',
  })
  @IsEnum(OriginType)
  origin: OriginType;

  @ApiProperty({
    enum: DosageForm,
    example: DosageForm.COMPRIMIDO,
    description: 'Forma farmacêutica do medicamento',
  })
  @IsEnum(DosageForm)
  dosageForm: DosageForm;

  @ApiProperty({
    example: 500,
    description: 'Quantidade da dosagem (ex: 500)',
  })
  @IsNumber()
  @Min(0)
  dosageAmount: number;

  @ApiProperty({
    enum: DosageUnit,
    example: DosageUnit.MG,
    description: 'Unidade da dosagem (ex: mg, ml, unidade)',
  })
  @IsEnum(DosageUnit)
  dosageUnit: DosageUnit;

  @ApiProperty({
    example: 'https://images.com/imagens/medicamento.png',
    description: 'URL opcional da imagem do medicamento',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
