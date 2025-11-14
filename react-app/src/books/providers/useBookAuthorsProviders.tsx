import { useCallback, useState } from 'react'
import api from '../../api/axios'

type Author = {
  id: string
  firstName: string
  lastName: string
}

export const useBookAuthorsProvider = () => {
  const [authors, setAuthors] = useState<Author[]>([])

  const loadAuthors = useCallback(async () => {
    try {
      const res = await api.get('/authors')
      setAuthors(res.data ?? [])
    } catch (err) {
      console.error('loadAuthors error', err)
    }
  }, [])

  return { authors, loadAuthors }
}