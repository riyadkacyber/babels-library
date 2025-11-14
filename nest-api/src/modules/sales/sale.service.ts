import { Injectable } from '@nestjs/common';
import { SaleRepository } from './sale.repository';

@Injectable()
export class SaleService {
  constructor(private readonly repo: SaleRepository) {}

  public async getAll() {
    return this.repo.getAll();
  }

  public async getById(id: string) {
    return this.repo.getById(id);
  }

  public async create(payload: any) {
    return this.repo.create(payload);
  }

  public async update(id: string, payload: any) {
    return this.repo.update(id, payload);
  }

  public async delete(id: string) {
    return this.repo.delete(id);
  }
}
