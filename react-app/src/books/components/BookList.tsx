import { useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import { useBookProvider } from '../providers/useBookProvider';
import { BookCard } from './BookCard';
import { CreateBookModal } from './CreateBookModal';

export function BookList() {
  const { books, loading, loadBooks, createBook, updateBook, deleteBook } =
    useBookProvider();

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  if (loading && books.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <CreateBookModal onCreate={createBook} />
      </div>

      <Row gutter={[16, 16]}>
        {books.map((book) => (
          <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={4.8}>
            <BookCard book={book} onDelete={deleteBook} onUpdate={updateBook} />
          </Col>
        ))}
      </Row>

      {books.length === 0 && !loading && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#999',
            fontSize: 16,
          }}
        >
          No books found. Create your first book!
        </div>
      )}
    </div>
  );
}