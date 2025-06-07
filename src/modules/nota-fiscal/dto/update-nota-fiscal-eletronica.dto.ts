import { PartialType } from '@nestjs/swagger';
import { CreateNotaFiscalEletronicaDto } from './create-nota-fiscal-eletronica.dto';

export class UpdateNotaFiscalEletronicaDto extends PartialType(
  CreateNotaFiscalEletronicaDto,
) {}
