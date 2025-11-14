export type SaleModel = {
  id: string;
  clientId: string;
  clientName?: string;
  bookId: string;
  bookTitle?: string;
  quantity: number;
  purchasedAt: Date;
};

export type CreateSaleModel = {
  clientId: string;
  bookId: string;
  quantity: number;
};

export type UpdateSaleModel = Partial<CreateSaleModel & { purchasedAt?: Date }>;
