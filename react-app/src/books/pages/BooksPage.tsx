import { Breadcrumb } from 'antd';
import { HomeOutlined, BookOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import { BookList } from '../components/BookList';

export function BooksPage() {
  return (
    <div style={{ padding: '1rem' }}>
      <Breadcrumb
        style={{ marginBottom: '1.5rem' }}
        items={[
          {
            title: (
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <HomeOutlined />
                <span>Home</span>
              </Link>
            ),
          },
          {
            title: (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <BookOutlined />
                <span>Books</span>
              </span>
            ),
          },
        ]}
      />
      
      <div
        style={{
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 'bold' }}>📚 Books Library</h1>
      </div>
      <BookList />
    </div>
  );
}