import { useState } from 'react';
import { Button, Col, Row, Input, Image, Space } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { ClientModel, UpdateClientModel } from '../ClientModel';
import { ImageUpload } from '../../components/ImageUpload';

interface ClientListItemProps {
  client: ClientModel;
  onDelete: (id: string) => void;
  onUpdate: (id: string, input: UpdateClientModel) => void;
}

export function ClientListItem({ client, onDelete, onUpdate }: ClientListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(client.fullName);
  const [email, setEmail] = useState(client.email);
  const [picture, setPicture] = useState(client.picture || '');

  const onCancelEdit = () => {
    setIsEditing(false);
    setFullName(client.fullName);
    setEmail(client.email);
    setPicture(client.picture || '');
  };

  const onValidateEdit = () => {
    // Validate email contains @
    if (!email.includes('@')) {
      alert('Please enter a valid email address with @');
      return;
    }
    onUpdate(client.id, { fullName, email, picture });
    setIsEditing(false);
  };

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
      <Col span={2}>
        {client.picture ? (
          <Image src={client.picture} width={50} height={50} style={{ borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <TeamOutlined style={{ fontSize: 40 }} />
        )}
      </Col>

      <Col span={14}>
        {isEditing ? (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" />
            <Input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Email (must contain @)" 
            />
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>Profile Picture:</label>
              <ImageUpload value={picture} onChange={setPicture} />
            </div>
          </Space>
        ) : (
          <div>
            <strong style={{ fontSize: 16 }}>{client.fullName}</strong>
            <div style={{ fontSize: 12, color: '#666' }}>
              📧 {client.email}
            </div>
            <div style={{ fontSize: 12, color: '#999' }}>
              Total Purchased: {client.totalPurchased || 0}
            </div>
          </div>
        )}
      </Col>

      <Col span={8} style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        {isEditing ? (
          <>
            <Button type="primary" onClick={onValidateEdit} icon={<CheckOutlined />} />
            <Button onClick={onCancelEdit} icon={<CloseOutlined />} />
          </>
        ) : (
          <Button type="primary" onClick={() => setIsEditing(true)} icon={<EditOutlined />} />
        )}
        <Button danger onClick={() => onDelete(client.id)} icon={<DeleteOutlined />} />
      </Col>
    </Row>
  );
}