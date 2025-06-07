import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateMedicamentoFornecedorDto {
  @ApiProperty({
    description: 'ID do medicamento',
    example: 'uuid-medicamento',
  })
  @IsUUID()
  medicamentoId: string;

  @ApiProperty({ description: 'ID do fornecedor', example: 'uuid-fornecedor' })
  @IsUUID()
  fornecedorId: string;
}
