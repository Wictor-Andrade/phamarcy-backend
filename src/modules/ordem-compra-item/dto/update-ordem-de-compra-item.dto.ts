import { PartialType } from '@nestjs/swagger';
import { CreateOrdemDeCompraItemDto } from './create-ordem-de-compra-item.dto';

export class UpdateOrdemDeCompraItemDto extends PartialType(
  CreateOrdemDeCompraItemDto,
) {}
