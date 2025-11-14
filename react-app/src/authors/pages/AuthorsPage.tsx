
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from '@tanstack/react-router';
import { AuthorList } from '../components/AuthorList';

export function AuthorsPage() {
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
                <UserOutlined />
                <span>Authors</span>
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
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 'bold' }}>✍️ Authors</h1>
      </div>
      <AuthorList />
    </div>
  );
}