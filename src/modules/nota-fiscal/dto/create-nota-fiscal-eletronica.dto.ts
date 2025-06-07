import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateNotaFiscalEletronicaDto {
  @ApiProperty({ description: 'Tipo de movimento', example: 'entrada' })
  @IsString()
  tipoMovimento: string;

  @ApiProperty({
    description: 'ID do cliente (opcional)',
    example: 'uuid-client',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @ApiProperty({ description: 'ID do fornecedor', example: 'uuid-fornecedor' })
  @IsUUID()
  fornecedorId: string;
}
