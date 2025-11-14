import { Button, Col, Row } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { SaleModel } from '../SaleModel';

interface SaleListItemProps {
  sale: SaleModel;
  onDelete: (id: string) => void;
  clientName?: string;
  bookTitle?: string;
}

export function SaleListItem({ sale, onDelete, clientName, bookTitle }: SaleListItemProps) {
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
    <Row
      style={{
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#EEEEEE',
        margin: '1rem 0',
        padding: '.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Col span={18}>
        <div>
          <strong style={{ fontSize: 16 }}>
            {clientName || 'Unknown Client'}
          </strong>
          {' purchased '}
          <strong>{sale.quantity}</strong>
          {' x '}
          <strong style={{ color: '#1890ff' }}>
            {bookTitle || 'Unknown Book'}
          </strong>
        </div>
        <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          📅 {formattedDate} at ⏰ {formattedTime}
        </div>
      </Col>

      <Col span={6} style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button danger onClick={() => onDelete(sale.id)} icon={<DeleteOutlined />} />
      </Col>
    </Row>
  );
}