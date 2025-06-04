import { IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuncionarioDto {
  @ApiProperty({ example: 'Maria Oliveira' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 2500.0 })
  @IsNumber()
  salario: number;

  @ApiProperty({
    example: 0.1,
    description: 'Porcentagem entre 0 e 1 (ex: 0.15 para 15%)',
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  porcentagemComissao: number;
}

