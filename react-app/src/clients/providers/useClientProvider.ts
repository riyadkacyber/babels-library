import { useState, useCallback } from 'react';
import type { ClientModel, CreateClientModel, UpdateClientModel } from '../ClientModel';

const API_URL = 'http://localhost:3000';

export const useClientProvider = () => {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [loading, setLoading] = useState(false);

  const loadClients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/clients`);
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error('Error loading clients:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createClient = useCallback(async (client: CreateClientModel) => {
    try {
      const res = await fetch(`${API_URL}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      });
      await res.json();
      await loadClients();
    } catch (err) {
      console.error('Error creating client:', err);
      throw err;
    }
  }, [loadClients]);

  const updateClient = useCallback(async (id: string, client: UpdateClientModel) => {
    try {
      const res = await fetch(`${API_URL}/clients/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client),
      });
      await res.json();
      await loadClients();
    } catch (err) {
      console.error('Error updating client:', err);
      throw err;
    }
  }, [loadClients]);

  const deleteClient = useCallback(async (id: string) => {
    try {
      await fetch(`${API_URL}/clients/${id}`, {
        method: 'DELETE',
      });
      await loadClients();
    } catch (err) {
      console.error('Error deleting client:', err);
      throw err;
    }
  }, [loadClients]);

  return {
    clients,
    loading,
    loadClients,
    createClient,
    updateClient,
    deleteClient,
  };
};