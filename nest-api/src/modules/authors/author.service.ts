import { Injectable } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { CreateAuthorModel, UpdateAuthorModel } from './author.model';

@Injectable()
export class AuthorService {
  constructor(private readonly repo: AuthorRepository) {}

  public async getAll() {
    return this.repo.getAllAuthors();
  }

  public async getById(id: string) {
    return this.repo.getAuthorById(id);
  }

  public async create(author: CreateAuthorModel) {
    return this.repo.createAuthor(author);
  }

  public async update(id: string, author: UpdateAuthorModel) {
    return this.repo.updateAuthor(id, author);
  }

  public async delete(id: string) {
    return this.repo.deleteAuthor(id);
  }
}