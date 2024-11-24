import {
  Typography,
  Input,
  Button,
  Space,
  List,
  Modal,
  Select,
  Spin,
} from 'antd'
import { useState, useEffect } from 'react'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DocumentEditorPage() {
  const { documentId, organizationId } = useParams()
  const { user } = useUserContext()
  const [content, setContent] = useState('')
  const [showVersions, setShowVersions] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [newComment, setNewComment] = useState('')

  // Fetch document data
  const { data: document, isLoading } = Api.document.findFirst.useQuery({
    where: { id: documentId },
    include: { owner: true },
  })

  // Update document mutation
  const { mutateAsync: updateDocument } = Api.document.update.useMutation()

  // Socket for real-time collaboration
  const { emit } = SocketClient.useEvent('document-update', (payload: any) => {
    if (payload.documentId === documentId && payload.userId !== user?.id) {
      setContent(payload.content)
    }
  })

  useEffect(() => {
    if (document?.content) {
      setContent(document.content)
    }
  }, [document])

  const handleContentChange = async (value: string) => {
    setContent(value)

    // Update document in database
    await updateDocument({
      where: { id: documentId },
      data: { content: value },
    })

    // Emit changes to other users
    emit({
      payload: {
        documentId,
        content: value,
        userId: user?.id,
      },
    })
  }

  const handleAddComment = async () => {
    if (!selectedText || !newComment) return

    // Store comment logic would go here
    // For this example, we'll just show a success message
    Modal.success({
      title: 'Comment Added',
      content: `Comment "${newComment}" added to text: "${selectedText}"`,
    })

    setNewComment('')
    setSelectedText('')
  }

  if (isLoading) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title level={2}>
              <i className="las la-file-alt" /> {document?.title}
            </Title>
            <Space>
              <Button onClick={() => setShowVersions(true)}>
                <i className="las la-history" /> Version History
              </Button>
              <Button onClick={() => setShowComments(true)}>
                <i className="las la-comments" /> Comments
              </Button>
              <Select defaultValue="private" style={{ width: 120 }}>
                <Select.Option value="private">
                  <i className="las la-lock" /> Private
                </Select.Option>
                <Select.Option value="shared">
                  <i className="las la-share" /> Shared
                </Select.Option>
                <Select.Option value="public">
                  <i className="las la-globe" /> Public
                </Select.Option>
              </Select>
            </Space>
          </div>

          {/* Editor */}
          <TextArea
            value={content}
            onChange={e => handleContentChange(e.target.value)}
            style={{ minHeight: '400px' }}
            placeholder="Start typing your document..."
          />

          {/* Comments Section */}
          <Modal
            title="Add Comment"
            open={!!selectedText}
            onOk={handleAddComment}
            onCancel={() => setSelectedText('')}
          >
            <Text>Selected Text: {selectedText}</Text>
            <TextArea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Enter your comment..."
              style={{ marginTop: '1rem' }}
            />
          </Modal>

          {/* Version History Modal */}
          <Modal
            title="Version History"
            open={showVersions}
            onCancel={() => setShowVersions(false)}
            footer={null}
          >
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  version: '1.0',
                  date: new Date(),
                  user: document?.owner?.name,
                },
                {
                  version: '1.1',
                  date: new Date(),
                  user: document?.owner?.name,
                },
              ]}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button key="restore" type="link">
                      Restore
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={`Version ${item.version}`}
                    description={`${dayjs(item.date).format(
                      'MMM D, YYYY HH:mm',
                    )} by ${item.user}`}
                  />
                </List.Item>
              )}
            />
          </Modal>
        </Space>
      </div>
    </PageLayout>
  )
}
