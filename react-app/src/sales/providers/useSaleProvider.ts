import { useState, useCallback } from 'react';
import type { SaleModel, CreateSaleModel } from '../SaleModel';

const API_URL = 'http://localhost:3000';

export const useSaleProvider = () => {
  const [sales, setSales] = useState<SaleModel[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSales = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/sales`);
      if (!res.ok) {
        throw new Error('Failed to load sales');
      }
      const data = await res.json();
      setSales(data);
    } catch (err) {
      console.error('Error loading sales:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createSale = useCallback(async (sale: CreateSaleModel) => {
    try {
      const res = await fetch(`${API_URL}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create sale');
      }
      
      await res.json();
      await loadSales();
    } catch (err: any) {
      console.error('Error creating sale:', err);
      throw err;
    }
  }, [loadSales]);

  const deleteSale = useCallback(async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/sales/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) {
        throw new Error('Failed to delete sale');
      }
      
      await loadSales();
    } catch (err) {
      console.error('Error deleting sale:', err);
      throw err;
    }
  }, [loadSales]);

  return {
    sales,
    loading,
    loadSales,
    createSale,
    deleteSale,
  };
};