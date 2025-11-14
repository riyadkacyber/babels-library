import { createFileRoute } from '@tanstack/react-router';
import { Card, Row, Col, Timeline, Divider, Breadcrumb } from 'antd';
import {
  BookOutlined,
  UserOutlined,
  TeamOutlined,
  DollarOutlined,
  RocketOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  GlobalOutlined,
  CheckCircleOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Link } from '@tanstack/react-router';

function AboutPage() {
  const features = [
    {
      icon: <BookOutlined style={{ fontSize: 32, color: '#1890ff' }} />,
      title: 'Book Management',
      description: 'Comprehensive book catalog with cover images, author information, publication years, and stock tracking.',
    },
    {
      icon: <UserOutlined style={{ fontSize: 32, color: '#722ed1' }} />,
      title: 'Author Database',
      description: 'Maintain detailed author profiles with automatic tracking of books written and total sales.',
    },
    {
      icon: <TeamOutlined style={{ fontSize: 32, color: '#52c41a' }} />,
      title: 'Client Management',
      description: 'Keep track of your customers with contact information and complete purchase history.',
    },
    {
      icon: <DollarOutlined style={{ fontSize: 32, color: '#fa8c16' }} />,
      title: 'Sales Tracking',
      description: 'Record and monitor all transactions with automatic inventory updates and sales analytics.',
    },
    {
      icon: <ThunderboltOutlined style={{ fontSize: 32, color: '#faad14' }} />,
      title: 'Real-time Updates',
      description: 'All changes are reflected instantly across the system with live data synchronization.',
    },
    {
      icon: <SafetyOutlined style={{ fontSize: 32, color: '#13c2c2' }} />,
      title: 'Data Security',
      description: 'Your data is securely stored and validated with built-in error handling and backups.',
    },
  ];

  const techStack = [
    { name: 'Frontend', tech: 'React + TypeScript + Ant Design', color: '#1890ff' },
    { name: 'Backend', tech: 'NestJS + TypeORM', color: '#722ed1' },
    { name: 'Database', tech: 'SQLite', color: '#52c41a' },
    { name: 'Routing', tech: 'TanStack Router', color: '#fa8c16' },
  ];

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Breadcrumb */}
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
                <InfoCircleOutlined />
                <span>About</span>
              </span>
            ),
          },
        ]}
      />

      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '4rem 2rem',
          borderRadius: 16,
          marginBottom: '2rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <RocketOutlined style={{ fontSize: 64, marginBottom: 16 }} />
        <h1 style={{ fontSize: 48, fontWeight: 'bold', margin: '0 0 16px 0', color: 'white' }}>
          About Babel's Library
        </h1>
        <p style={{ fontSize: 20, margin: 0, opacity: 0.9, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
          A modern, full-stack bookstore management system designed to streamline your book inventory, 
          sales tracking, and customer management all in one place.
        </p>
      </div>

      {/* Rest of the About page content remains the same... */}
      {/* Mission Statement */}
      <Card
        style={{
          borderRadius: 12,
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ textAlign: 'center', padding: '1rem' }}>
          <GlobalOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
          <h2 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Our Mission</h2>
          <p style={{ fontSize: 16, color: '#595959', maxWidth: 800, margin: '0 auto', lineHeight: 1.8 }}>
            Babel's Library aims to simplify bookstore operations by providing an intuitive, 
            powerful platform that handles everything from inventory management to sales analytics. 
            We believe that managing a bookstore should be as enjoyable as reading the books themselves.
          </p>
        </div>
      </Card>

      {/* Features Grid */}
      <h2 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
        Key Features
      </h2>
      <Row gutter={[16, 16]} style={{ marginBottom: '3rem' }}>
        {features.map((feature, index) => (
          <Col key={index} xs={24} sm={12} lg={8}>
            <Card
              hoverable
              style={{
                height: '100%',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: '#f5f5f5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: 14, color: '#595959', margin: 0, lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Tech Stack */}
      <Card
        style={{
          borderRadius: 12,
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
          Built With Modern Technology
        </h2>
        <Row gutter={[16, 16]}>
          {techStack.map((item, index) => (
            <Col key={index} xs={24} sm={12} lg={6}>
              <div
                style={{
                  padding: '1.5rem',
                  borderRadius: 12,
                  backgroundColor: '#fafafa',
                  textAlign: 'center',
                  border: `2px solid ${item.color}`,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    color: '#8c8c8c',
                    marginBottom: 8,
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: item.color,
                  }}
                >
                  {item.tech}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* How It Works Timeline */}
      <Card
        style={{
          borderRadius: 12,
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <h2 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
          How It Works
        </h2>
        <Timeline
          mode="alternate"
          items={[
            {
              color: '#1890ff',
              children: (
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                    <BookOutlined /> Add Books & Authors
                  </h4>
                  <p style={{ color: '#595959', margin: 0 }}>
                    Create your book catalog with cover images, publication details, and link them to authors.
                  </p>
                </div>
              ),
            },
            {
              color: '#52c41a',
              children: (
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                    <TeamOutlined /> Register Clients
                  </h4>
                  <p style={{ color: '#595959', margin: 0 }}>
                    Build your customer database with contact information and purchase preferences.
                  </p>
                </div>
              ),
            },
            {
              color: '#fa8c16',
              children: (
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                    <DollarOutlined /> Process Sales
                  </h4>
                  <p style={{ color: '#595959', margin: 0 }}>
                    Record transactions and let the system automatically update inventory and track statistics.
                  </p>
                </div>
              ),
            },
            {
              color: '#722ed1',
              children: (
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
                    <CheckCircleOutlined /> Analyze & Grow
                  </h4>
                  <p style={{ color: '#595959', margin: 0 }}>
                    View real-time analytics on sales, popular books, and customer trends.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Why Choose Us */}
      <Card
        style={{
          borderRadius: 12,
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      >
        <h2 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
          Why Choose Babel's Library?
        </h2>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a', flexShrink: 0, marginTop: 4 }} />
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Easy to Use</h4>
                <p style={{ margin: 0, color: '#595959' }}>
                  Intuitive interface designed for both beginners and experienced users.
                </p>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a', flexShrink: 0, marginTop: 4 }} />
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Fully Responsive</h4>
                <p style={{ margin: 0, color: '#595959' }}>
                  Works seamlessly on desktop, tablet, and mobile devices.
                </p>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a', flexShrink: 0, marginTop: 4 }} />
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Real-time Sync</h4>
                <p style={{ margin: 0, color: '#595959' }}>
                  All data updates instantly across all pages and sessions.
                </p>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a', flexShrink: 0, marginTop: 4 }} />
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 4 }}>Comprehensive Analytics</h4>
                <p style={{ margin: 0, color: '#595959' }}>
                  Track sales, inventory, and customer behavior with built-in statistics.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Version & Credits */}
      <Card
        style={{
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <Divider />
        <p style={{ fontSize: 14, color: '#8c8c8c', margin: '8px 0' }}>
          Version 1.0.0 | Built with ❤️ for bookstore enthusiasts
        </p>
        <p style={{ fontSize: 12, color: '#bfbfbf', margin: 0 }}>
          © 2024 Babel's Library. All rights reserved.
        </p>
      </Card>
    </div>
  );
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
});