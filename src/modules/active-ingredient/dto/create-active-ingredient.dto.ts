import { IsString, IsUUID, IsInt, Min } from 'class-validator';

export class CreateActiveIngredientDto {
  @IsString()
  nome: string;

  @IsString()
  descricao: string;

  @IsUUID()
  idMedicamentoGenerico: string;

  @IsInt()
  @Min(0)
  estoqueMin: number;

  @IsInt()
  @Min(0)
  estoqueIdeal: number;

  @IsInt()
  @Min(0)
  estoqueMax: number;
}
