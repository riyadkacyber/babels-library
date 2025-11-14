export type ClientModel = {
  id: string;
  fullName: string;
  email: string;
  picture?: string;
  totalPurchased: number;
};

export type CreateClientModel = {
  fullName: string;
  email: string;
  picture?: string;
};

export type UpdateClientModel = Partial<CreateClientModel>;