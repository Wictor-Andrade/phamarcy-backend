import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateOrdemDeCompraItemDto {
  @ApiProperty({ description: 'ID da ordem de compra' })
  @IsUUID()
  ordemDeCompraId: string;

  @ApiProperty({ description: 'ID do medicamento' })
  @IsUUID()
  medicamentoId: string;
}
