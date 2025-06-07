import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdemDeCompraItemService } from './ordem-de-compra-item.service';
import { CreateOrdemDeCompraItemDto } from './dto/create-ordem-de-compra-item.dto';
import { UpdateOrdemDeCompraItemDto } from './dto/update-ordem-de-compra-item.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdemDeCompraItemResponseDto } from './dto/ordem-de-compra-item-response.dto';

@ApiTags('OrdemDeCompraItem')
@Controller('ordem-de-compra-item')
export class OrdemDeCompraItemController {
  constructor(private readonly service: OrdemDeCompraItemService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um item de ordem de compra' })
  @ApiResponse({ status: 201, type: OrdemDeCompraItemResponseDto })
  create(@Body() createDto: CreateOrdemDeCompraItemDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os itens' })
  @ApiResponse({ status: 200, type: [OrdemDeCompraItemResponseDto] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um item por ID' })
  @ApiParam({ name: 'id', description: 'ID do item', type: String })
  @ApiResponse({ status: 200, type: OrdemDeCompraItemResponseDto })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um item por ID' })
  @ApiParam({ name: 'id', description: 'ID do item', type: String })
  @ApiResponse({ status: 200, type: OrdemDeCompraItemResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateOrdemDeCompraItemDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um item por ID' })
  @ApiParam({ name: 'id', description: 'ID do item', type: String })
  @ApiResponse({ status: 204, description: 'Item removido com sucesso' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
