import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {IsCpfCnpj} from '../../../common/decorators/is-cpf-cnpj.decorator'

export class CreateClientDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  nome: string;

  @ApiProperty({ example: '12345678900', description: 'CPF ou CNPJ' })
  @IsString()
  @IsCpfCnpj()
  cpfCnpj: string;

  @ApiProperty({ example: '(69)99999-8888', required: false })
  @IsOptional()
  @IsString()
  telefone?: string;
}
