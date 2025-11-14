export type SaleModel = {
  id: string;
  clientId: string;
  bookId: string;
  quantity: number;
  purchasedAt: string;
  client?: {
    fullName: string;
  };
  book?: {
    title: string;
  };
};

export type CreateSaleModel = {
  clientId: string;
  bookId: string;
  quantity: number;
};