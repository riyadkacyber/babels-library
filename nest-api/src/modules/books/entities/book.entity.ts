import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthorEntity, type AuthorId } from '../../authors/author.entity';

export type BookId = string & { __brand: 'Book' };

@Entity('books')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: BookId;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'year_published', type: 'int' })
  yearPublished: number;

  // new: picture URL or path
  @Column({ name: 'picture', type: 'varchar', nullable: true })
  picture?: string;

  // new: how many copies available
  @Column({ name: 'quantity', type: 'int', default: 0 })
  quantity: number;

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: AuthorId;

  @ManyToOne(() => AuthorEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: AuthorEntity;
}
