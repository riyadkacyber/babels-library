import { useEffect, useState } from 'react';
import type { CreateBookModel } from '../BookModel';
import { Button, Input, Modal, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useBookAuthorsProvider } from '../providers/useBookAuthorsProviders';
import { ImageUpload } from '../../components/ImageUpload';

interface CreateBookModalProps {
  onCreate: (book: CreateBookModel) => void;
}

export function CreateBookModal({ onCreate }: CreateBookModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [yearPublished, setYearPublished] = useState(2024);
  const [authorId, setAuthorId] = useState<string | undefined>(undefined);
  const [picture, setPicture] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { authors, loadAuthors } = useBookAuthorsProvider();

  const onClose = () => {
    setTitle('');
    setYearPublished(2024);
    setAuthorId(undefined);
    setPicture('');
    setQuantity(1);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadAuthors();
    }
  }, [isOpen, loadAuthors]);

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Book
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          if (authorId) {
            onCreate({
              title,
              yearPublished,
              authorId,
              picture,
              quantity,
            });
            onClose();
          }
        }}
        okButtonProps={{
          disabled: !authorId || !title?.length || !yearPublished || quantity < 0,
        }}
        width={600}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Select
            style={{ width: '100%' }}
            placeholder="Select Author"
            options={authors.map(author => ({
              label: `${author.firstName} ${author.lastName}`,
              value: author.id,
            }))}
            value={authorId}
            onChange={value => setAuthorId(value)}
          />
          <Input
            type="number"
            placeholder="Year Published"
            value={yearPublished}
            onChange={e => setYearPublished(Number(e.target.value))}
            min={1500}
            max={2025}
          />
          <Input
            type="number"
            placeholder="Quantity in Stock"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            min={0}
          />
          <div>
            <label style={{ display: 'block', marginBottom: 8 }}>Book Cover:</label>
            <ImageUpload value={picture} onChange={setPicture} />
          </div>
        </Space>
      </Modal>
    </>
  );
}