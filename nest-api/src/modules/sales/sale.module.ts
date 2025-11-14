import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { SaleRepository } from './sale.repository';
import { BookEntity } from '../books/entities/book.entity';
import { ClientEntity } from '../clients/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, BookEntity, ClientEntity])],
  controllers: [SaleController],
  providers: [SaleService, SaleRepository],
  exports: [SaleService],
})
export class SaleModule {}
