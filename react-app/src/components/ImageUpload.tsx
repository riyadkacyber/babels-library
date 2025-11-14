import { Upload, Button, message, Image } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
import { useState } from 'react';

interface ImageUploadProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(value);

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Set max dimensions
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = height * (MAX_WIDTH / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = width * (MAX_HEIGHT / height);
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with compression (0.7 quality = 70%)
          const base64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(base64);
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleChange = async (file: RcFile) => {
    try {
      // Show loading message
      const hide = message.loading('Compressing image...', 0);
      
      // Compress the image
      const base64 = await compressImage(file);
      
      hide();
      setPreview(base64);
      onChange?.(base64);
      message.success('Image uploaded!');
    } catch (error) {
      console.error('Error compressing image:', error);
      message.error('Failed to process image');
    }
    return false; // Prevent auto upload
  };

  const handleRemove = () => {
    setPreview(undefined);
    onChange?.('');
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {preview && (
        <div style={{ position: 'relative' }}>
          <Image 
            src={preview} 
            width={100} 
            height={100} 
            style={{ objectFit: 'cover', borderRadius: 8 }} 
            preview={true}
          />
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={handleRemove}
            style={{ position: 'absolute', top: 4, right: 4 }}
          />
        </div>
      )}
      <Upload
        beforeUpload={handleChange}
        showUploadList={false}
        accept="image/*"
      >
        <Button icon={<UploadOutlined />}>
          {preview ? 'Change Image' : 'Upload Image'}
        </Button>
      </Upload>
    </div>
  );
}