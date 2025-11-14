import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { CreateClientModel, UpdateClientModel } from './client.model';

@Injectable()
export class ClientService {
  constructor(private readonly repo: ClientRepository) {}

  public async getAll() {
    return this.repo.getAll();
  }

  public async getById(id: string) {
    return this.repo.getById(id);
  }

  public async create(payload: CreateClientModel) {
    return this.repo.create(payload);
  }

  public async update(id: string, payload: UpdateClientModel) {
    return this.repo.update(id, payload);
  }

  public async delete(id: string) {
    return this.repo.delete(id);
  }
}