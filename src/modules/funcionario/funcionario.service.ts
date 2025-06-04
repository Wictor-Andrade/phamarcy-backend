import { Injectable } from '@nestjs/common';
import { FuncionarioRepository } from './funcionario.repository';

@Injectable()
export class FuncionarioService {
  constructor(private readonly repo: FuncionarioRepository) {}

  getAll() {
    return this.repo.findAll();
  }

  getById(id: string) {
    return this.repo.findById(id);
  }

  create(data: any) {
    return this.repo.create(data);
  }

  update(id: string, data: any) {
    return this.repo.update(id, data);
  }

  delete(id: string) {
    return this.repo.delete(id);
  }
}
