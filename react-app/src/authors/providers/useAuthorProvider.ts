import { useState, useCallback } from 'react';
import type { AuthorModel, CreateAuthorModel, UpdateAuthorModel } from '../AuthorModel';

const API_URL = 'http://localhost:3000';

export const useAuthorProvider = () => {
  const [authors, setAuthors] = useState<AuthorModel[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAuthors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/authors`);
      const data = await res.json();
      setAuthors(data);
    } catch (err) {
      console.error('Error loading authors:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAuthor = useCallback(async (author: CreateAuthorModel) => {
    try {
      const res = await fetch(`${API_URL}/authors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(author),
      });
      await res.json();
      await loadAuthors();
    } catch (err) {
      console.error('Error creating author:', err);
      throw err;
    }
  }, [loadAuthors]);

  const updateAuthor = useCallback(async (id: string, author: UpdateAuthorModel) => {
    try {
      const res = await fetch(`${API_URL}/authors/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(author),
      });
      await res.json();
      await loadAuthors();
    } catch (err) {
      console.error('Error updating author:', err);
      throw err;
    }
  }, [loadAuthors]);

  const deleteAuthor = useCallback(async (id: string) => {
    try {
      await fetch(`${API_URL}/authors/${id}`, {
        method: 'DELETE',
      });
      await loadAuthors();
    } catch (err) {
      console.error('Error deleting author:', err);
      throw err;
    }
  }, [loadAuthors]);

  return {
    authors,
    loading,
    loadAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
  };
};