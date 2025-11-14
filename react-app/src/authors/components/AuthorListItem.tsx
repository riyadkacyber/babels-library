import { useState } from 'react';
import { Button, Col, Row, Input, Image, Space } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { AuthorModel, UpdateAuthorModel } from '../AuthorModel';
import { ImageUpload } from '../../components/ImageUpload';

interface AuthorListItemProps {
  author: AuthorModel;
  onDelete: (id: string) => void;
  onUpdate: (id: string, input: UpdateAuthorModel) => void;
}

export function AuthorListItem({ author, onDelete, onUpdate }: AuthorListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(author.firstName);
  const [lastName, setLastName] = useState(author.lastName);
  const [picture, setPicture] = useState(author.picture || '');

  const onCancelEdit = () => {
    setIsEditing(false);
    setFirstName(author.firstName);
    setLastName(author.lastName);
    setPicture(author.picture || '');
  };

  const onValidateEdit = () => {
    onUpdate(author.id, { firstName, lastName, picture });
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
        {author.picture ? (
          <Image src={author.picture} width={50} height={50} style={{ borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <UserOutlined style={{ fontSize: 40 }} />
        )}
      </Col>

      <Col span={14}>
        {isEditing ? (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
            <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>Profile Picture:</label>
              <ImageUpload value={picture} onChange={setPicture} />
            </div>
          </Space>
        ) : (
          <div>
            <strong style={{ fontSize: 16 }}>{author.firstName} {author.lastName}</strong>
            <div style={{ fontSize: 12, color: '#666' }}>
              Books: {author.totalBooks || 0} | Sold: {author.totalSold || 0}
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
        <Button danger onClick={() => onDelete(author.id)} icon={<DeleteOutlined />} />
      </Col>
    </Row>
  );
}