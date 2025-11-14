import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './author.entity';
import { BookEntity } from '../books/entities/book.entity';
import { SaleEntity } from '../sales/sale.entity';
import { CreateAuthorModel, UpdateAuthorModel } from './author.model';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepo: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepo: Repository<BookEntity>,
    @InjectRepository(SaleEntity)
    private readonly saleRepo: Repository<SaleEntity>,
  ) {}

  public async getAllAuthors(): Promise<any[]> {
    const authors = await this.authorRepo.find();
    
    // Calculate stats for each author
    const authorsWithStats = await Promise.all(
      authors.map(async (author) => {
        // Count total book titles by this author
        const totalBooks = await this.bookRepo.count({
          where: { authorId: author.id as any },
        });

        // Calculate total copies sold across all their books
        const salesData = await this.saleRepo
          .createQueryBuilder('sale')
          .leftJoin('sale.book', 'book')
          .where('book.authorId = :authorId', { authorId: author.id })
          .select('SUM(sale.quantity)', 'total')
          .getRawOne();

        const totalCopiesSold = Number(salesData?.total || 0);

        // Calculate average: total copies sold ÷ number of book titles
        const averageSoldPerBook = totalBooks > 0 
          ? Math.round(totalCopiesSold / totalBooks) 
          : 0;

        return {
          ...author,
          totalBooks,
          totalSold: averageSoldPerBook, // This is now average per book title
        };
      })
    );

    return authorsWithStats;
  }

  public async getAuthorById(id: string) {
    const author = await this.authorRepo.findOne({ where: { id: id as any } });
    if (!author) return undefined;

    // Count total book titles
    const totalBooks = await this.bookRepo.count({
      where: { authorId: id as any },
    });

    // Calculate total copies sold
    const salesData = await this.saleRepo
      .createQueryBuilder('sale')
      .leftJoin('sale.book', 'book')
      .where('book.authorId = :authorId', { authorId: id })
      .select('SUM(sale.quantity)', 'total')
      .getRawOne();

    const totalCopiesSold = Number(salesData?.total || 0);

    // Calculate average per book title
    const averageSoldPerBook = totalBooks > 0 
      ? Math.round(totalCopiesSold / totalBooks) 
      : 0;

    return {
      ...author,
      totalBooks,
      totalSold: averageSoldPerBook,
    };
  }

  public async createAuthor(author: CreateAuthorModel) {
    return this.authorRepo.save(this.authorRepo.create(author as any));
  }

  public async updateAuthor(id: string, author: UpdateAuthorModel) {
    await this.authorRepo.update(id as any, author as any);
    return this.getAuthorById(id);
  }

  public async deleteAuthor(id: string) {
    await this.authorRepo.delete(id as any);
  }
}