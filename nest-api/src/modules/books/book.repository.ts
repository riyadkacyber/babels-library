// src/modules/books/book.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AuthorEntity } from '../authors/author.entity';
import {
  BookModel,
  CreateBookModel,
  FilterBooksModel,
  UpdateBookModel,
} from './book.model';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAllBooks(
    input?: FilterBooksModel,
  ): Promise<[BookModel[], number]> {
    const [books, totalCount] = await this.bookRepository.findAndCount({
      take: input?.limit,
      skip: input?.offset,
      relations: { author: true },
      order: input?.sort,
    });

    const mapped: BookModel[] = books.map((b) => ({
      id: b.id as string,
      title: b.title,
      yearPublished: b.yearPublished,
      picture: b.picture,
      quantity: b.quantity,
      author: b.author
        ? { firstName: b.author.firstName, lastName: b.author.lastName }
        : { firstName: '', lastName: '' },
    }));

    return [mapped, totalCount];
  }

  public async getBookById(id: string): Promise<BookModel | undefined> {
    const book = await this.bookRepository.findOne({
      where: { id: id as any },
      relations: ['author'],
    });

    if (!book) return undefined;

    return {
      id: book.id as string,
      title: book.title,
      yearPublished: book.yearPublished,
      picture: book.picture,
      quantity: book.quantity,
      author: book.author
        ? { firstName: book.author.firstName, lastName: book.author.lastName }
        : { firstName: '', lastName: '' },
    };
  }

  public async createBook(book: CreateBookModel): Promise<BookModel> {
    const author = await this.authorRepository.findOne({
      where: { id: book.authorId as any },
    });

    if (!author) throw new Error('Author not found');

    // ✅ create returns ONE entity, explicitly type it
    const createdEntity: BookEntity = this.bookRepository.create({
      ...book,
    });

    // ✅ save returns ONE entity when we give ONE object
    const savedEntity = await this.bookRepository.save(createdEntity);

    return {
      id: savedEntity.id as string,
      title: savedEntity.title,
      yearPublished: savedEntity.yearPublished,
      picture: savedEntity.picture,
      quantity: savedEntity.quantity,
      author: {
        firstName: author.firstName,
        lastName: author.lastName,
      },
    };
  }

  public async updateBook(
    id: string,
    book: UpdateBookModel,
  ): Promise<BookModel | undefined> {
    const oldBook = await this.bookRepository.findOne({
      where: { id: id as any },
      relations: ['author'],
    });

    if (!oldBook) return undefined;

    await this.bookRepository.update(id as any, book as any);
    return this.getBookById(id);
  }

  public async deleteBook(id: string): Promise<void> {
    await this.bookRepository.delete(id as any);
  }

  public async deleteBooks(ids: string[]): Promise<void> {
    await this.dataSource.transaction(async (tm) => {
      for (const id of ids) {
        await tm.delete(BookEntity, { id: id as any });
      }
    });
  }
}
