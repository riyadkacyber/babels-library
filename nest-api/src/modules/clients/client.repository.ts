import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';
import { SaleEntity } from '../sales/sale.entity';
import { CreateClientModel, UpdateClientModel } from './client.model';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
    @InjectRepository(SaleEntity)
    private readonly saleRepo: Repository<SaleEntity>,
  ) {}

  public async getAll(): Promise<any[]> {
    const clients = await this.clientRepo.find();

    // Calculate total purchased for each client
    const clientsWithStats = await Promise.all(
      clients.map(async (client) => {
        const salesData = await this.saleRepo
          .createQueryBuilder('sale')
          .where('sale.clientId = :clientId', { clientId: client.id })
          .select('SUM(sale.quantity)', 'total')
          .getRawOne();

        const totalPurchased = Number(salesData?.total || 0);

        return {
          ...client,
          totalPurchased,
        };
      })
    );

    return clientsWithStats;
  }

  public async getById(id: string) {
    const client = await this.clientRepo.findOne({ where: { id: id as any } });
    if (!client) return undefined;

    const salesData = await this.saleRepo
      .createQueryBuilder('sale')
      .where('sale.clientId = :clientId', { clientId: id })
      .select('SUM(sale.quantity)', 'total')
      .getRawOne();

    const totalPurchased = Number(salesData?.total || 0);

    return {
      ...client,
      totalPurchased,
    };
  }

  public async create(client: CreateClientModel) {
    return this.clientRepo.save(this.clientRepo.create(client as any));
  }

  public async update(id: string, client: UpdateClientModel) {
    await this.clientRepo.update(id as any, client as any);
    return this.getById(id);
  }

  public async delete(id: string) {
    await this.clientRepo.delete(id as any);
  }
}