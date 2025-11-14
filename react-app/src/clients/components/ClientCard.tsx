import { useState } from 'react';
import { Card, Button, Input, Modal, Space, Avatar, message } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, MailOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import type { ClientModel, UpdateClientModel } from '../ClientModel';
import { ImageUpload } from '../../components/ImageUpload';

interface ClientCardProps {
  client: ClientModel;
  onDelete: (id: string) => void;
  onUpdate: (id: string, input: UpdateClientModel) => void;
}

export function ClientCard({ client, onDelete, onUpdate }: ClientCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [fullName, setFullName] = useState(client.fullName);
  const [email, setEmail] = useState(client.email);
  const [picture, setPicture] = useState(client.picture || '');

  const handleUpdate = () => {
    if (!email.includes('@')) {
      message.error('Please enter a valid email address with @');
      return;
    }
    onUpdate(client.id, { fullName, email, picture });
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setFullName(client.fullName);
    setEmail(client.email);
    setPicture(client.picture || '');
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Card
        hoverable
        style={{
          height: '100%',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: 16 }}>
          {client.picture ? (
            <Avatar
              src={client.picture}
              size={120}
              style={{ border: '4px solid #f0f0f0' }}
            />
          ) : (
            <Avatar
              icon={<UserOutlined />}
              size={120}
              style={{ backgroundColor: '#52c41a', border: '4px solid #f0f0f0' }}
            />
          )}
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 'bold', margin: '0 0 8px 0' }}>
          {client.fullName}
        </h3>

        <div
          style={{
            fontSize: 14,
            color: '#666',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <MailOutlined />
          <span style={{ wordBreak: 'break-all' }}>{client.email}</span>
        </div>

        <div
          style={{
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <ShoppingCartOutlined style={{ fontSize: 24, color: '#1890ff', marginBottom: 4 }} />
          <div style={{ fontSize: 12, color: '#999' }}>Total Purchased</div>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1890ff' }}>
            {client.totalPurchased || 0}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setIsEditModalOpen(true)}
            style={{ flex: 1 }}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(client.id)}
            style={{ flex: 1 }}
          >
            Delete
          </Button>
        </div>
      </Card>

      {/* Edit Modal */}
      <Modal
        title="Edit Client"
        open={isEditModalOpen}
        onOk={handleUpdate}
        onCancel={handleCancel}
        width={600}
        okText="Save"
        cancelText="Cancel"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>Full Name:</label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>Email:</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (must contain @)"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>Profile Picture:</label>
            <ImageUpload value={picture} onChange={setPicture} />
          </div>
        </Space>
      </Modal>
    </>
  );
}