import { useState } from 'react';
import { Button, Input, Modal, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { CreateClientModel } from '../ClientModel';
import { ImageUpload } from '../../components/ImageUpload';

interface CreateClientModalProps {
  onCreate: (client: CreateClientModel) => Promise<void>;
}

export function CreateClientModal({ onCreate }: CreateClientModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setFullName('');
    setEmail('');
    setPicture('');
  };

  const handleOk = async () => {
    // Validate email
    if (!email.includes('@')) {
      message.error('Please enter a valid email address with @');
      return;
    }

    setLoading(true);
    try {
      await onCreate({ fullName, email, picture });
      message.success('Client created successfully!');
      handleClose();
    } catch (err) {
      console.error(err);
      message.error('Failed to create client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsOpen(true)}
      >
        Create Client
      </Button>
      <Modal
        title="Create Client"
        open={isOpen}
        onCancel={handleClose}
        onOk={handleOk}
        okButtonProps={{
          disabled: !fullName || !email,
          loading,
        }}
        width={600}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email (must contain @)"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div>
            <label style={{ display: 'block', marginBottom: 8 }}>Profile Picture:</label>
            <ImageUpload value={picture} onChange={setPicture} />
          </div>
        </Space>
      </Modal>
    </>
  );
}