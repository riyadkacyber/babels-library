import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SaleEntity } from '../sales/sale.entity';

export type ClientId = string & { __brand: 'Client' };

@Entity('clients')
export class ClientEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ClientId;

  @Column({ name: 'full_name', type: 'varchar' })
  fullName: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'picture', type: 'varchar', nullable: true })
  picture?: string;

  @OneToMany(() => SaleEntity, (sale) => sale.client)
  sales?: SaleEntity[];
}
