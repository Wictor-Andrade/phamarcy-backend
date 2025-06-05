import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicamentoDto {
  @ApiProperty({ example: 'Paracetamol' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 'e263bd68-faf7-4c9f-9e02-2aab2dcaa90c' })
  @IsUUID()
  activeIngredientId: string;
}
