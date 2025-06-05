import { ApiProperty } from '@nestjs/swagger';

export class OrdemDeCompraItemResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  ordemDeCompraId: string;

  @ApiProperty()
  medicamentoId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
