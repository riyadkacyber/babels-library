import { useState, useEffect } from 'react';
import { Button, Input, Modal, Select, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { CreateSaleModel } from '../SaleModel';
import { useBookProvider } from '../../books/providers/useBookProvider';
import { useClientProvider } from '../../clients/providers/useClientProvider';

interface CreateSaleModalProps {
  onCreate: (sale: CreateSaleModel) => Promise<void>;
}

export function CreateSaleModal({ onCreate }: CreateSaleModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [clientId, setClientId] = useState('');
  const [bookId, setBookId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const { books, loadBooks } = useBookProvider();
  const { clients, loadClients } = useClientProvider();

  useEffect(() => {
    if (isOpen) {
      loadBooks();
      loadClients();
    }
  }, [isOpen, loadBooks, loadClients]);

  const handleClose = () => {
    setIsOpen(false);
    setClientId('');
    setBookId('');
    setQuantity(1);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      await onCreate({ clientId, bookId, quantity });
      message.success('Sale created successfully!');
      handleClose();
    } catch (err: any) {
      console.error('Sale creation error:', err);
      message.error(err.message || 'Failed to create sale');
    } finally {
      setLoading(false);
    }
  };

  const selectedBook = books.find(b => b.id === bookId);

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsOpen(true)}
      >
        Create Sale
      </Button>
      <Modal
        title="Create Sale"
        open={isOpen}
        onCancel={handleClose}
        onOk={handleOk}
        okButtonProps={{
          disabled: !clientId || !bookId || !quantity || quantity < 1,
          loading,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            placeholder="Select Client"
            style={{ width: '100%' }}
            value={clientId || undefined}
            onChange={value => setClientId(value)}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={clients.map(client => ({
              label: `${client.fullName} (${client.email})`,
              value: client.id,
            }))}
          />
          <Select
            placeholder="Select Book"
            style={{ width: '100%' }}
            value={bookId || undefined}
            onChange={value => setBookId(value)}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={books.map(book => ({
              label: `${book.title} (Stock: ${book.quantity})`,
              value: book.id,
            }))}
          />
          {selectedBook && (
            <div style={{ padding: '8px', background: '#f0f0f0', borderRadius: 4 }}>
              Available stock: <strong>{selectedBook.quantity}</strong>
            </div>
          )}
          <Input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            min={1}
            max={selectedBook?.quantity || 999}
          />
        </Space>
      </Modal>
    </>
  );
}