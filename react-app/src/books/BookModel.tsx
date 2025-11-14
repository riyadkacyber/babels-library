import type { AuthorId } from '../authors/AuthorModel';

export type BookAuthorModel = {
  firstName: string;
  lastName: string;
} | null;

export type BookModel = {
  id: string;
  title: string;
  yearPublished: number;
  author: BookAuthorModel;
  picture?: string;
  quantity: number; // Make this required, not optional
};

export type CreateBookModel = {
  authorId: string;
  title: string;
  yearPublished: number;
  picture?: string;
  quantity: number; // Make this required with default value
};

export type UpdateBookModel = Partial<CreateBookModel>;