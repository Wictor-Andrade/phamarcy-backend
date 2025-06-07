import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ActiveIngredientService } from './active-ingredient.service';
import { UpdateActiveIngredientDto } from './dto/update-active-ingredient.dto';
import { CreateActiveIngredientStepOneDto } from './dto/create-active-ingredient-step-one.dto';

@Controller('active-ingredients')
export class ActiveIngredientController {
  constructor(private readonly service: ActiveIngredientService) {}

  @Post()
  create(@Body() dto: CreateActiveIngredientStepOneDto) {
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
