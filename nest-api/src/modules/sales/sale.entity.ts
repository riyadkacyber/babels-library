import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { ClientEntity } from '../clients/client.entity';
import { BookEntity } from '../books/entities/book.entity';

export type SaleId = string & { __brand: 'Sale' };

@Entity('sales')
export class SaleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: SaleId;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @Column({ name: 'book_id', type: 'uuid' })
  bookId: string;

  @Column({ name: 'quantity', type: 'int', default: 1 })
  quantity: number;

  @CreateDateColumn({ name: 'purchased_at' }) // This automatically sets current timestamp
  purchasedAt: Date;

  @ManyToOne(() => ClientEntity, (client) => client.sales, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;
}