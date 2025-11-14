import { useState } from 'react';
import { Card, Button, Input, Modal, Space, Image } from 'antd';
import { EditOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import type { BookModel, UpdateBookModel } from '../BookModel';
import { ImageUpload } from '../../components/ImageUpload';

interface BookCardProps {
  book: BookModel;
  onDelete: (id: string) => void;
  onUpdate: (id: string, input: UpdateBookModel) => void;
}

export function BookCard({ book, onDelete, onUpdate }: BookCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [yearPublished, setYearPublished] = useState(book.yearPublished);
  const [quantity, setQuantity] = useState(book.quantity);
  const [picture, setPicture] = useState(book.picture || '');

  const handleUpdate = () => {
    onUpdate(book.id, { title, yearPublished, quantity, picture });
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setTitle(book.title);
    setYearPublished(book.yearPublished);
    setQuantity(book.quantity);
    setPicture(book.picture || '');
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Card
        hoverable
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
        cover={
          <Link to="/books/$bookId" params={{ bookId: book.id }}>
            <div
              style={{
                height: 280,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                overflow: 'hidden',
              }}
            >
              {book.picture ? (
                <Image
                  src={book.picture}
                  alt={book.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  preview={false}
                />
              ) : (
                <BookOutlined style={{ fontSize: 80, color: '#bfbfbf' }} />
              )}
            </div>
          </Link>
        }
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Link
            to="/books/$bookId"
            params={{ bookId: book.id }}
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#1890ff',
              marginBottom: 8,
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {book.title}
          </Link>

          <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
            📅 Year: <strong>{book.yearPublished}</strong>
          </div>

          <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>
            ✍️ Author:{' '}
            <strong>
              {book.author
                ? `${book.author.firstName} ${book.author.lastName}`
                : 'Unknown'}
            </strong>
          </div>

          <div style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>
            📦 Stock:{' '}
            <strong style={{ color: book.quantity > 0 ? '#52c41a' : '#ff4d4f' }}>
              {book.quantity}
            </strong>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsEditModalOpen(true)}
              style={{ flex: 1 }}
            >
              Edit
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(book.id)}
              style={{ flex: 1 }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>

      {/* Edit Modal */}
      <Modal
        title="Edit Book"
        open={isEditModalOpen}
        onOk={handleUpdate}
        onCancel={handleCancel}
        width={600}
        okText="Save"
        cancelText="Cancel"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>Title:</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>Year Published:</label>
            <Input
              type="number"
              value={yearPublished}
              onChange={(e) => setYearPublished(Number(e.target.value))}
              placeholder="Year"
              min={1500}
              max={2025}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>Stock Quantity:</label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="Quantity"
              min={0}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>Book Cover:</label>
            <ImageUpload value={picture} onChange={setPicture} />
          </div>
        </Space>
      </Modal>
    </>
  );
}