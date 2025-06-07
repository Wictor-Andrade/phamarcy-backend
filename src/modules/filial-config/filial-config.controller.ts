import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FilialConfigService } from './filial-config.service';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';

@ApiTags('Config')
@Controller('config')
export class FilialConfigController {
  constructor(private readonly service: FilialConfigService) {}

  @Post()
  @ApiOperation({ summary: 'Criar configuração' })
  @ApiResponse({ status: 201, description: 'Configuração criada' })
  create(@Body() dto: CreateConfigDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as configurações' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar configuração por ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('filial/:filialId')
  @ApiOperation({ summary: 'Buscar configuração por ID da filial' })
  findByFilial(@Param('filialId') filialId: string) {
    return this.service.findByFilialId(filialId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar configuração' })
  update(@Param('id') id: string, @Body() dto: UpdateConfigDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover configuração' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
