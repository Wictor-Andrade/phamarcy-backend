import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { MedicamentoFornecedorService } from './medicamento-fornecedor.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateMedicamentoFornecedorDto } from './dto/create-medicamento-fornecedor.dto';
import { UpdateMedicamentoFornecedorDto } from './dto/update-medicamento-fornecedor.dto';

@ApiTags('MedicamentoFornecedor')
@Controller('medicamento-fornecedor')
export class MedicamentoFornecedorController {
  constructor(private readonly service: MedicamentoFornecedorService) {}

  @Post()
  @ApiOperation({ summary: 'Criar relação medicamento e fornecedor' })
  create(@Body() dto: CreateMedicamentoFornecedorDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as relações' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar relação por ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar relação' })
  update(@Param('id') id: string, @Body() dto: UpdateMedicamentoFornecedorDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover relação' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
