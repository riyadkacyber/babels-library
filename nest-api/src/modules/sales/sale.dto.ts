import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateSaleDto {
  @IsUUID(4)
  clientId: string;

  @IsUUID(4)
  bookId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateSaleDto {
  @IsUUID(4)
  clientId?: string;

  @IsUUID(4)
  bookId?: string;

  @IsInt()
  @Min(1)
  quantity?: number;
}