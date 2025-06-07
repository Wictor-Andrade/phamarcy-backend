import { Injectable } from '@nestjs/common';
import { CreatePromocaoDto } from './dto/create-promocao.dto';
import { UpdatePromocaoDto } from './dto/update-promocao.dto';
import { PromocaoRepository } from './promocao.repository';

@Injectable()
export class PromocaoService {
  constructor(private readonly repository: PromocaoRepository) {}

  create(dto: CreatePromocaoDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, dto: UpdatePromocaoDto) {
    return this.repository.update(id, dto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
