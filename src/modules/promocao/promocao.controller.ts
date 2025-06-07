import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PromocaoService } from './promocao.service';
import { CreatePromocaoDto } from './dto/create-promocao.dto';
import { UpdatePromocaoDto } from './dto/update-promocao.dto';
import { ApiTags } from '@nestjs/swagger';
import { Promocao } from '@prisma/client';

@ApiTags('Promoção')
@Controller('promocao')
export class PromocaoController {
  constructor(private readonly service: PromocaoService) {}

  @Post()
  create(@Body() dto: CreatePromocaoDto): Promise<Promocao> {
    return this.service.create(dto);
  }

  @Get()
  findAll(): Promise<Promocao[]> {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePromocaoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
