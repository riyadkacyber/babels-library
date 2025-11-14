import { Skeleton, Space, Typography } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link, useParams } from '@tanstack/react-router'

export const BookDetails = () => {
  const { bookId } = useParams({ from: '/books/$bookId' })
  const { isLoading, book, loadBook } = useBookDetailsProvider(bookId)

  useEffect(() => {
    loadBook()
  }, [bookId, loadBook])

  if (isLoading) {
    return <Skeleton active />
  }

  if (!book) {
    return (
      <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
        <Link to="/books">
          <ArrowLeftOutlined /> Back
        </Link>
        <Typography.Title level={3}>Book not found</Typography.Title>
      </Space>
    )
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to="/books">
        <ArrowLeftOutlined /> Back
      </Link>
      <Typography.Title level={1}>{book.title}</Typography.Title>
      <Typography.Title level={3}>{book.yearPublished}</Typography.Title>
      <div>
        by {book.author.firstName} {book.author.lastName}
      </div>
    </Space>
  )
}