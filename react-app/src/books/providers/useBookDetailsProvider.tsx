import { useCallback, useEffect, useState } from 'react'
import type { BookModel } from '../BookModel'
import api from '../../api/axios'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState<BookModel | null>(null)

  const loadBook = useCallback(async () => {
    if (!id) return
    setIsLoading(true)
    try {
      const res = await api.get(`/books/${id}`)
      setBook(res.data ?? null)
    } catch (err) {
      console.error('loadBook error', err)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadBook()
  }, [loadBook])

  return { isLoading, book, loadBook }
}