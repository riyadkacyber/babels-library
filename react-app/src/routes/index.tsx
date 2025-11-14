import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, Row, Col, Statistic } from 'antd';
import { 
  BookOutlined, 
  UserOutlined, 
  TeamOutlined, 
  DollarOutlined,
  ArrowRightOutlined 
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

function IndexPage() {
  const [stats, setStats] = useState({
    books: 0,
    authors: 0,
    clients: 0,
    sales: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [booksRes, authorsRes, clientsRes, salesRes] = await Promise.all([
          fetch('http://localhost:3000/books?limit=1000&offset=0'), // Fetch with large limit
          fetch('http://localhost:3000/authors'),
          fetch('http://localhost:3000/clients'),
          fetch('http://localhost:3000/sales'),
        ]);

        const booksData = await booksRes.json();
        const authors = await authorsRes.json();
        const clients = await clientsRes.json();
        const sales = await salesRes.json();

        // Books endpoint returns { data: [], total: number }
        const booksCount = booksData.total || booksData.data?.length || 0;

        setStats({
          books: booksCount,
          authors: authors.length || 0,
          clients: clients.length || 0,
          sales: sales.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const dashboardCards = [
    {
      title: 'Manage Books',
      description: 'Browse, add, edit, and manage your book collection',
      icon: <BookOutlined style={{ fontSize: 48, color: '#1890ff' }} />,
      link: '/books',
      color: '#e6f7ff',
      borderColor: '#1890ff',
      count: stats.books,
      countLabel: 'Total Books',
    },
    {
      title: 'Manage Authors',
      description: 'View and manage authors in your library',
      icon: <UserOutlined style={{ fontSize: 48, color: '#722ed1' }} />,
      link: '/authors',
      color: '#f9f0ff',
      borderColor: '#722ed1',
      count: stats.authors,
      countLabel: 'Total Authors',
    },
    {
      title: 'Manage Clients',
      description: 'Track and manage your customer database',
      icon: <TeamOutlined style={{ fontSize: 48, color: '#52c41a' }} />,
      link: '/clients',
      color: '#f6ffed',
      borderColor: '#52c41a',
      count: stats.clients,
      countLabel: 'Total Clients',
    },
    {
      title: 'Manage Sales',
      description: 'View sales history and create new transactions',
      icon: <DollarOutlined style={{ fontSize: 48, color: '#fa8c16' }} />,
      link: '/sales',
      color: '#fff7e6',
      borderColor: '#fa8c16',
      count: stats.sales,
      countLabel: 'Total Sales',
    },
  ];

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Header Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '3rem 2rem',
          borderRadius: 16,
          marginBottom: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          color: 'white',
        }}
      >
        <h1 style={{ fontSize: 42, fontWeight: 'bold', margin: 0, color: 'white' }}>
          📚 Welcome to Babel's Library
        </h1>
        <p style={{ fontSize: 18, margin: '12px 0 0 0', opacity: 0.9 }}>
          Your complete bookstore management solution
        </p>
      </div>

      {/* Stats Overview */}
      <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            loading={loading}
            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Statistic
              title="Total Books"
              value={stats.books}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            loading={loading}
            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Statistic
              title="Total Authors"
              value={stats.authors}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            loading={loading}
            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Statistic
              title="Total Clients"
              value={stats.clients}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            loading={loading}
            style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Statistic
              title="Total Sales"
              value={stats.sales}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Management Cards */}
      <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: '1rem' }}>
        Quick Access
      </h2>
      <Row gutter={[16, 16]}>
        {dashboardCards.map((card, index) => (
          <Col key={index} xs={24} sm={12} lg={6}>
            <Link to={card.link} style={{ textDecoration: 'none' }}>
              <Card
                hoverable
                style={{
                  height: '100%',
                  borderRadius: 12,
                  borderLeft: `4px solid ${card.borderColor}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                }}
                bodyStyle={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    backgroundColor: card.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  {card.icon}
                </div>

                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    margin: '0 0 8px 0',
                    color: '#262626',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    fontSize: 14,
                    color: '#8c8c8c',
                    margin: '0 0 16px 0',
                    flex: 1,
                  }}
                >
                  {card.description}
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 16,
                    borderTop: '1px solid #f0f0f0',
                  }}
                >
                  <span style={{ color: card.borderColor, fontWeight: 'bold' }}>
                    {card.count} {card.countLabel.split(' ')[1]}
                  </span>
                  <ArrowRightOutlined style={{ color: card.borderColor }} />
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Features Section */}
      <div
        style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'white',
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: '1rem' }}>
          Features
        </h2>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <BookOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 8 }} />
              <h4 style={{ margin: '8px 0' }}>Book Management</h4>
              <p style={{ fontSize: 12, color: '#8c8c8c', margin: 0 }}>
                Complete CRUD operations for books with image support
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <UserOutlined style={{ fontSize: 32, color: '#722ed1', marginBottom: 8 }} />
              <h4 style={{ margin: '8px 0' }}>Author Tracking</h4>
              <p style={{ fontSize: 12, color: '#8c8c8c', margin: 0 }}>
                Track authors with book counts and sales statistics
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <TeamOutlined style={{ fontSize: 32, color: '#52c41a', marginBottom: 8 }} />
              <h4 style={{ margin: '8px 0' }}>Client Database</h4>
              <p style={{ fontSize: 12, color: '#8c8c8c', margin: 0 }}>
                Manage customer information and purchase history
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <DollarOutlined style={{ fontSize: 32, color: '#fa8c16', marginBottom: 8 }} />
              <h4 style={{ margin: '8px 0' }}>Sales Tracking</h4>
              <p style={{ fontSize: 12, color: '#8c8c8c', margin: 0 }}>
                Record and monitor all sales transactions
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: IndexPage,
});