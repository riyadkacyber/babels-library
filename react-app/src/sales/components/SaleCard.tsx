import { Card, Button, Tag, Avatar } from 'antd';
import { DeleteOutlined, UserOutlined, BookOutlined, CalendarOutlined, ShoppingOutlined } from '@ant-design/icons';
import type { SaleModel } from '../SaleModel';

interface SaleCardProps {
  sale: SaleModel;
  onDelete: (id: string) => void;
  clientName?: string;
  bookTitle?: string;
}

export function SaleCard({ sale, onDelete, clientName, bookTitle }: SaleCardProps) {
  const saleDate = new Date(sale.purchasedAt);
  const formattedDate = saleDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = saleDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card
      hoverable
      style={{
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Avatar Section */}
        <Avatar
          size={64}
          icon={<ShoppingOutlined />}
          style={{ backgroundColor: '#1890ff', flexShrink: 0 }}
        />

        {/* Content Section */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <UserOutlined style={{ color: '#1890ff' }} />
            <strong style={{ fontSize: 16 }}>{clientName || 'Unknown Client'}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <BookOutlined style={{ color: '#52c41a' }} />
            <span style={{ fontSize: 14, color: '#666' }}>
              {bookTitle || 'Unknown Book'}
            </span>
            <Tag color="blue" style={{ marginLeft: 8 }}>
              Qty: {sale.quantity}
            </Tag>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CalendarOutlined style={{ color: '#999' }} />
            <span style={{ fontSize: 12, color: '#999' }}>
              {formattedDate} at {formattedTime}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(sale.id)}
          style={{ flexShrink: 0 }}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
}