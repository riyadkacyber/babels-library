import { useState } from 'react';
import { Card, Button, Input, Modal, Space, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, BookOutlined, ShoppingOutlined } from '@ant-design/icons';
import type { AuthorModel, UpdateAuthorModel } from '../AuthorModel';
import { ImageUpload } from '../../components/ImageUpload';

interface AuthorCardProps {
  author: AuthorModel;
  onDelete: (id: string) => void;
  onUpdate: (id: string, input: UpdateAuthorModel) => void;
}

export function AuthorCard({ author, onDelete, onUpdate }: AuthorCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [firstName, setFirstName] = useState(author.firstName);
  const [lastName, setLastName] = useState(author.lastName);
  const [picture, setPicture] = useState(author.picture || '');

  const handleUpdate = () => {
    onUpdate(author.id, { firstName, lastName, picture });
    setIsEditModalOpen(false);
  };

  const handleCancel = () => {
    setFirstName(author.firstName);
    setLastName(author.lastName);
    setPicture(author.picture || '');
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
          {author.picture ? (
            <Avatar
              src={author.picture}
              size={120}
              style={{ border: '4px solid #f0f0f0' }}
            />
          ) : (
            <Avatar
              icon={<UserOutlined />}
              size={120}
              style={{ backgroundColor: '#722ed1', border: '4px solid #f0f0f0' }}
            />
          )}
        </div>

        <h3 style={{ fontSize: 18, fontWeight: 'bold', margin: '0 0 12px 0' }}>
          {author.firstName} {author.lastName}
        </h3>

        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              padding: '12px 0',
              backgroundColor: '#f5f5f5',
              borderRadius: 8,
            }}
          >
            <div>
              <BookOutlined style={{ fontSize: 20, color: '#1890ff' }} />
              <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Books</div>
              <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                {author.totalBooks || 0}
              </div>
            </div>
            <div>
              <ShoppingOutlined style={{ fontSize: 20, color: '#52c41a' }} />
              <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Avg/Book</div>
              <div style={{ fontSize: 18, fontWeight: 'bold' }}>
                {author.totalSold || 0}
              </div>
            </div>
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
            onClick={() => onDelete(author.id)}
            style={{ flex: 1 }}
          >
            Delete
          </Button>
        </div>
      </Card>

      {/* Edit Modal */}
      <Modal
        title="Edit Author"
        open={isEditModalOpen}
        onOk={handleUpdate}
        onCancel={handleCancel}
        width={600}
        okText="Save"
        cancelText="Cancel"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>First Name:</label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 4 }}>Last Name:</label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
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