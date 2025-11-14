import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './author.entity';
import { BookEntity } from '../books/entities/book.entity';
import { SaleEntity } from '../sales/sale.entity';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorRepository } from './author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity, BookEntity, SaleEntity])],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository],
  exports: [AuthorService],
})
export class AuthorModule {}
