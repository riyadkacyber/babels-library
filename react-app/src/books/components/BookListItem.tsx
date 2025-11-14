import { useState } from 'react';
import type { BookModel, UpdateBookModel } from '../BookModel';
import { Button, Col, Row, Input, Image, Space } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import { ImageUpload } from '../../components/ImageUpload';

interface BookListItemProps {
  book: BookModel;
  onDelete: (id: string) => void;
  onUpdate: (id: string, input: UpdateBookModel) => void;
}

export function BookListItem({ book, onDelete, onUpdate }: BookListItemProps) {
  const [title, setTitle] = useState(book.title);
  const [yearPublished, setYearPublished] = useState(book.yearPublished);
  const [quantity, setQuantity] = useState(book.quantity);
  const [picture, setPicture] = useState(book.picture || '');
  const [isEditing, setIsEditing] = useState(false);

  const onCancelEdit = () => {
    setIsEditing(false);
    setTitle(book.title);
    setYearPublished(book.yearPublished);
    setQuantity(book.quantity);
    setPicture(book.picture || '');
  };

  const onValidateEdit = () => {
    onUpdate(book.id, { title, yearPublished, quantity, picture });
    setIsEditing(false);
  };

  return (
    <Row
      style={{
        width: '100%',
        minHeight: '70px',
        borderRadius: '10px',
        backgroundColor: '#EEEEEE',
        margin: '1rem 0',
        padding: '.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Col span={2}>
        {book.picture ? (
          <Image src={book.picture} width={60} height={60} style={{ objectFit: 'cover', borderRadius: 8 }} />
        ) : (
          <BookOutlined style={{ fontSize: 40 }} />
        )}
      </Col>

      <Col span={14} style={{ paddingLeft: '1rem' }}>
        {isEditing ? (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Title"
            />
            <Input 
              type="number"
              value={yearPublished} 
              onChange={e => setYearPublished(Number(e.target.value))} 
              placeholder="Year"
              min={1500}
              max={2025}
            />
            <Input 
              type="number"
              value={quantity} 
              onChange={e => setQuantity(Number(e.target.value))} 
              placeholder="Quantity"
              min={0}
            />
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>Book Cover:</label>
              <ImageUpload value={picture} onChange={setPicture} />
            </div>
          </Space>
        ) : (
          <div>
            <Link
              to="/books/$bookId"
              params={{ bookId: book.id }}
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                color: '#1890ff',
              }}
            >
              {book.title}
            </Link>
            <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
              Year: {book.yearPublished} | Stock: <strong>{book.quantity}</strong>
            </div>
          </div>
        )}
      </Col>

      <Col span={5} style={{ margin: 'auto 0', textAlign: 'center' }}>
        {!isEditing && book.author && (
          <div>
            <div style={{ fontSize: 12, color: '#888' }}>by</div>
            <strong>{book.author.firstName} {book.author.lastName}</strong>
          </div>
        )}
      </Col>

      <Col span={3} style={{ display: 'flex', gap: '.25rem', justifyContent: 'flex-end' }}>
        {isEditing ? (
          <>
            <Button type="primary" onClick={onValidateEdit}>
              <CheckOutlined />
            </Button>
            <Button onClick={onCancelEdit}>
              <CloseOutlined />
            </Button>
          </>
        ) : (
          <Button type="primary" onClick={() => setIsEditing(true)}>
            <EditOutlined />
          </Button>
        )}
        <Button type="primary" danger onClick={() => onDelete(book.id)}>
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  );
}