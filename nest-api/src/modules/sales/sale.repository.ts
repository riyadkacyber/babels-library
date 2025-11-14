import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { CreateSaleModel, UpdateSaleModel } from './sale.model';
import { BookEntity } from '../books/entities/book.entity';
import { ClientEntity } from '../clients/client.entity';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepo: Repository<SaleEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepo: Repository<BookEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAll(): Promise<SaleEntity[]> {
    return this.saleRepo.find({ 
      relations: ['client', 'book'], 
      order: { purchasedAt: 'DESC' } 
    });
  }

  public async getById(id: string) {
    return this.saleRepo.findOne({ 
      where: { id: id as any }, 
      relations: ['client', 'book'] 
    });
  }

  public async create(sale: CreateSaleModel) {
    return this.dataSource.transaction(async (tm) => {
      // Find book
      const book = await tm.findOne(BookEntity, { 
        where: { id: sale.bookId as any } 
      });
      
      if (!book) {
        throw new Error('Book not found');
      }

      // Check stock
      if (book.quantity < sale.quantity) {
        throw new Error(`Not enough stock. Available: ${book.quantity}, Requested: ${sale.quantity}`);
      }

      // Find client
      const client = await tm.findOne(ClientEntity, { 
        where: { id: sale.clientId as any } 
      });
      
      if (!client) {
        throw new Error('Client not found');
      }

      // Decrement book stock
      await tm.update(BookEntity, 
        { id: sale.bookId as any }, 
        { quantity: book.quantity - sale.quantity }
      );

      // Create sale
      const newSale = tm.create(SaleEntity, {
        clientId: sale.clientId,
        bookId: sale.bookId,
        quantity: sale.quantity,
      });

      return tm.save(SaleEntity, newSale);
    });
  }

  public async update(id: string, changes: UpdateSaleModel) {
    const existing = await this.saleRepo.findOne({ 
      where: { id: id as any } 
    });
    
    if (!existing) {
      return undefined;
    }

    await this.saleRepo.update(id as any, changes as any);
    return this.getById(id);
  }

  public async delete(id: string) {
    await this.saleRepo.delete(id as any);
  }
}