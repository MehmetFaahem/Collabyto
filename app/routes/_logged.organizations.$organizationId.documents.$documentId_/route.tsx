import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNango } from '@/plugins/nango/client'
import { SocketClient } from '@/plugins/socket/client'
import { useParams } from '@remix-run/react'
import 'ace-builds/src-noconflict/mode-text'
import 'ace-builds/src-noconflict/theme-github'
import {
  Button,
  Divider,
  Input,
  List,
  message,
  Modal,
  Select,
  Space,
  Spin,
  Tooltip,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { DiffEditor } from 'react-ace'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

export default function DocumentEditorPage() {
  const { documentId, organizationId } = useParams()
  const { user } = useUserContext()
  const [content, setContent] = useState('')
  const [showVersions, setShowVersions] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [newComment, setNewComment] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [activeUsers, setActiveUsers] = useState<string[]>([])
  const [showSync, setShowSync] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<any>(null)
  const saveTimeoutRef = useRef<any>(null)
  const nango = useNango()

  // Fetch document data
  const { data: document, isLoading } = Api.document.findFirst.useQuery({
    where: { id: documentId },
    include: { owner: true, versions: { orderBy: { editedAt: 'desc' } } },
  })

  // Update document mutation
  const { mutateAsync: updateDocument } = Api.document.update.useMutation()
  const { mutateAsync: createVersion } =
    Api.documentVersion.create.useMutation()
  const { mutateAsync: restoreVersion } =
    Api.documentVersion.restore.useMutation()
  const { mutateAsync: nangoProxy } = Api.nango.proxy.useMutation()

  // Socket for real-time collaboration
  const { emit } = SocketClient.useEvent('document-update', (payload: any) => {
    if (payload.documentId === documentId && payload.userId !== user?.id) {
      setContent(payload.content)
    }
    if (payload.type === 'presence') {
      setActiveUsers(payload.users)
    }
  })

  useEffect(() => {
    // Emit presence on mount
    emit({
      payload: {
        type: 'presence',
        documentId,
        userId: user?.id,
        action: 'join',
      },
    })

    // Cleanup on unmount
    return () => {
      emit({
        payload: {
          type: 'presence',
          documentId,
          userId: user?.id,
          action: 'leave',
        },
      })
    }
  }, [])

  useEffect(() => {
    if (document?.content) {
      setContent(document.content)
    }
  }, [document])

  const handleContentChange = async (value: string) => {
    setContent(value)
    setIsSaving(true)

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    // Set new timeout for autosave
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        // Create version of current content
        await createVersion({
          data: {
            documentId,
            content: value,
            editedById: user!.id,
          },
        })

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

        setIsSaving(false)
        message.success('Document saved')
      } catch (error) {
        setIsSaving(false)
        message.error('Failed to save document')
      }
    }, 1000)
  }

  const handleSyncService = async (service: string) => {
    try {
      await nango.auth(service, user?.id)
      const config = {
        method: 'POST',
        endpoint:
          service === 'notion'
            ? 'https://api.notion.com/v1/pages'
            : 'https://docs.googleapis.com/v1/documents',
        providerConfigKey: service,
        connectionId: user?.id,
        data: {
          title: document?.title,
          content: content,
        },
      }
      await nangoProxy(config)
      message.success(`Document synced to ${service}`)
    } catch (error) {
      message.error(`Failed to sync with ${service}`)
    }
  }

  const handleRestoreVersion = async (version: any) => {
    try {
      await restoreVersion({
        versionId: version.id,
        documentId,
      })
      setContent(version.content)
      message.success('Version restored successfully')
      setShowVersions(false)
    } catch (error) {
      message.error('Failed to restore version')
    }
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
              <Tooltip title={isSaving ? 'Saving...' : 'Saved'}>
                <Button
                  icon={
                    <i
                      className={`las la-${
                        isSaving ? 'sync fa-spin' : 'check'
                      }`}
                    />
                  }
                />
              </Tooltip>
              <Button onClick={() => setShowVersions(true)}>
                <i className="las la-history" /> Version History
              </Button>
              <Button onClick={() => setShowComments(true)}>
                <i className="las la-comments" /> Comments
              </Button>
              <Button onClick={() => setShowSync(true)}>
                <i className="las la-sync" /> Sync
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
              <Space>
                {activeUsers.map(userId => (
                  <Tooltip
                    key={userId}
                    title={`${
                      userId === user?.id ? 'You' : 'Someone'
                    } is editing`}
                  >
                    <div className="user-indicator" />
                  </Tooltip>
                ))}
              </Space>
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
            width={800}
            footer={null}
          >
            <List
              itemLayout="horizontal"
              dataSource={document?.versions}
              renderItem={version => (
                <List.Item
                  actions={[
                    <Button
                      key="view"
                      type="link"
                      onClick={() => setSelectedVersion(version)}
                    >
                      View Diff
                    </Button>,
                    <Button
                      key="restore"
                      type="link"
                      onClick={() => handleRestoreVersion(version)}
                    >
                      Restore
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={`Version from ${dayjs(version.editedAt).format(
                      'MMM D, YYYY HH:mm',
                    )}`}
                    description={`Edited by ${
                      version.editedBy?.name || 'Unknown'
                    }`}
                  />
                </List.Item>
              )}
            />
            {selectedVersion && (
              <div style={{ marginTop: 16 }}>
                <Divider />
                <DiffEditor
                  value={[selectedVersion.content, content]}
                  mode="text"
                  theme="github"
                  name="diff-editor"
                  readOnly={true}
                  height="300px"
                />
              </div>
            )}
          </Modal>

          {/* Sync Modal */}
          <Modal
            title="Sync Document"
            open={showSync}
            onCancel={() => setShowSync(false)}
            footer={null}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                block
                icon={<i className="las la-book" />}
                onClick={() => handleSyncService('notion')}
              >
                Sync with Notion
              </Button>
              <Button
                block
                icon={<i className="las la-file-alt" />}
                onClick={() => handleSyncService('google-docs')}
              >
                Sync with Google Docs
              </Button>
            </Space>
          </Modal>
        </Space>
      </div>
    </PageLayout>
  )
}
