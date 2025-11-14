import { useState } from 'react';
import { Button, Input, Modal, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { CreateAuthorModel } from '../AuthorModel';
import { ImageUpload } from '../../components/ImageUpload';

interface CreateAuthorModalProps {
  onCreate: (author: CreateAuthorModel) => Promise<void>;
}

export function CreateAuthorModal({ onCreate }: CreateAuthorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [picture, setPicture] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setFirstName('');
    setLastName('');
    setPicture('');
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      await onCreate({ firstName, lastName, picture });
      handleClose();
    } catch (err) {
      console.error(err);
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
        Create Author
      </Button>
      <Modal
        title="Create Author"
        open={isOpen}
        onCancel={handleClose}
        onOk={handleOk}
        okButtonProps={{
          disabled: !firstName || !lastName,
          loading,
        }}
        width={600}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
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