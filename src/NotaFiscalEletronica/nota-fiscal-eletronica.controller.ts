import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { NotaFiscalEletronicaService } from './nota-fiscal-eletronica.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateNotaFiscalEletronicaDto } from './dto/create-nota-fiscal-eletronica.dto';
import { UpdateNotaFiscalEletronicaDto } from './dto/update-nota-fiscal-eletronica.dto';

@ApiTags('NotaFiscalEletronica')
@Controller('nota-fiscal-eletronica')
export class NotaFiscalEletronicaController {
  constructor(private readonly service: NotaFiscalEletronicaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma Nota Fiscal Eletrônica' })
  create(@Body() dto: CreateNotaFiscalEletronicaDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as Notas Fiscais Eletrônicas' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma Nota Fiscal Eletrônica por ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma Nota Fiscal Eletrônica' })
  update(@Param('id') id: string, @Body() dto: UpdateNotaFiscalEletronicaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar uma Nota Fiscal Eletrônica' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
