import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ActiveIngredientService } from './active-ingredient.service';
import { CreateActiveIngredientDto } from './dto/create-active-ingredient.dto';
import { UpdateActiveIngredientDto } from './dto/update-active-ingredient.dto';

@Controller('active-ingredients')
export class ActiveIngredientController {
  constructor(private readonly service: ActiveIngredientService) {}

  @Post()
  create(@Body() dto: CreateActiveIngredientDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateActiveIngredientDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
