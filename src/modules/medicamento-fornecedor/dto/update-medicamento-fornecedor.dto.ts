import { PartialType } from '@nestjs/swagger';
import { CreateMedicamentoFornecedorDto } from './create-medicamento-fornecedor.dto';

export class UpdateMedicamentoFornecedorDto extends PartialType(
  CreateMedicamentoFornecedorDto,
) {}
