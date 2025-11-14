import { useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import { useAuthorProvider } from '../providers/useAuthorProvider';
import { AuthorCard } from './AuthorCard';
import { CreateAuthorModal } from './CreateAuthorModal';

export function AuthorList() {
  const { authors, loading, loadAuthors, createAuthor, updateAuthor, deleteAuthor } =
    useAuthorProvider();

  useEffect(() => {
    loadAuthors();
  }, [loadAuthors]);

  if (loading && authors.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <CreateAuthorModal onCreate={createAuthor} />
      </div>

      <Row gutter={[16, 16]}>
        {authors.map((author) => (
          <Col key={author.id} xs={24} sm={12} md={8} lg={6} xl={4.8}>
            <AuthorCard
              author={author}
              onDelete={deleteAuthor}
              onUpdate={updateAuthor}
            />
          </Col>
        ))}
      </Row>

      {authors.length === 0 && !loading && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#999',
            fontSize: 16,
          }}
        >
          No authors found. Create your first author!
        </div>
      )}
    </div>
  );
}