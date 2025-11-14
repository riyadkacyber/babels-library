import { useEffect } from 'react';
import { Spin, Empty } from 'antd';
import { useSaleProvider } from '../providers/useSaleProvider';
import { SaleCard } from './SaleCard';
import { CreateSaleModal } from './CreateSaleModal';
import { useBookProvider } from '../../books/providers/useBookProvider';
import { useClientProvider } from '../../clients/providers/useClientProvider';

export function SaleList() {
  const { sales, loading, loadSales, createSale, deleteSale } = useSaleProvider();
  const { books, loadBooks } = useBookProvider();
  const { clients, loadClients } = useClientProvider();

  useEffect(() => {
    loadSales();
    loadBooks();
    loadClients();
  }, [loadSales, loadBooks, loadClients]);

  if (loading && sales.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <CreateSaleModal onCreate={createSale} />
      </div>

      {sales.length === 0 && !loading ? (
        <Empty
          description="No sales recorded yet"
          style={{ marginTop: '3rem' }}
        />
      ) : (
        <div>
          {sales.map((sale) => {
            const client = clients.find((c) => c.id === sale.clientId);
            const book = books.find((b) => b.id === sale.bookId);

            return (
              <SaleCard
                key={sale.id}
                sale={sale}
                onDelete={deleteSale}
                clientName={client?.fullName}
                bookTitle={book?.title}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}