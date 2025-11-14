import { useCallback, useState } from 'react'
import type { BookModel, CreateBookModel, UpdateBookModel } from '../BookModel'
import api from '../../api/axios'

export const useBookProvider = () => {
  const [books, setBooks] = useState<BookModel[]>([])

  const loadBooks = useCallback(async () => {
    try {
      const res = await api.get('/books', { params: { limit: 100, offset: 0 } })
      setBooks(res.data.data ?? [])
    } catch (err) {
      console.error('loadBooks error', err)
    }
  }, [])

  const createBook = useCallback(
    async (payload: CreateBookModel) => {
      try {
        await api.post('/books', payload)
        await loadBooks()
      } catch (err) {
        console.error('createBook error', err)
      }
    },
    [loadBooks]
  )

  const updateBook = useCallback(
    async (id: string, input: UpdateBookModel) => {
      try {
        await api.patch(`/books/${id}`, input)
        await loadBooks()
      } catch (err) {
        console.error('updateBook error', err)
      }
    },
    [loadBooks]
  )

  const deleteBook = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/books/${id}`)
        await loadBooks()
      } catch (err) {
        console.error('deleteBook error', err)
      }
    },
    [loadBooks]
  )

  return { books, loadBooks, createBook, updateBook, deleteBook }
}