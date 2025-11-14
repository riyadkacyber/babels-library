export type AuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  picture?: string;
  totalBooks: number;
  totalSold: number;
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
  picture?: string;
};

export type UpdateAuthorModel = Partial<CreateAuthorModel>;