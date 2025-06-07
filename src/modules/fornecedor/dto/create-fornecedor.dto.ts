import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateFornecedorDto {
  @ApiProperty({ example: 'Fornecedor XYZ', description: 'Nome do fornecedor' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: '12345678000190', description: 'CNPJ do fornecedor' })
  @IsString()
  @Matches(/^\d{14}$/, { message: 'CNPJ deve conter 14 dígitos numéricos' })
  cnpj: string;

  @ApiProperty({
    example: '(11) 91234-5678',
    description: 'Telefone do fornecedor',
  })
  @IsString()
  @IsNotEmpty()
  telefone: string;
}
