import {
  Typography,
  Input,
  Button,
  Table,
  Space,
  Modal,
  Form,
  Select,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { Search } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DocumentsPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [searchText, setSearchText] = useState('')
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Fetch documents with folders and owners
  const { data: documents, refetch } = Api.document.findMany.useQuery({
    where: {
      organizationId,
      title: { contains: searchText, mode: 'insensitive' },
    },
    include: {
      folder: true,
      owner: true,
    },
  })

  // Fetch folders for organization
  const { data: folders } = Api.folder.findMany.useQuery({
    where: { organizationId },
  })

  // Create document mutation
  const { mutateAsync: createDocument } = Api.document.create.useMutation()

  const handleSearch = (value: string) => {
    setSearchText(value)
  }

  const handleCreateDocument = async (values: any) => {
    try {
      await createDocument({
        data: {
          title: values.title,
          content: '',
          organizationId: organizationId!,
          folderId: values.folderId,
          ownerId: user!.id,
        },
      })
      message.success('Document created successfully')
      setIsCreateModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to create document')
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <Space>
          <i className="las la-file-alt" />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Folder',
      dataIndex: 'folder',
      key: 'folder',
      render: (folder: any) => (
        <Space>
          <i className="las la-folder" />
          <Text>{folder?.name || 'Root'}</Text>
        </Space>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      render: (owner: any) => (
        <Space>
          <i className="las la-user" />
          <Text>{owner?.name || owner?.email}</Text>
        </Space>
      ),
    },
    {
      title: 'Sharing',
      key: 'sharing',
      render: () => (
        <Space>
          <i className="las la-lock" />
          <Text>Private</Text>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>
            <i className="las la-file-alt" style={{ marginRight: 8 }} />
            Documents
          </Title>
          <Text type="secondary">
            Manage and organize your workspace documents
          </Text>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <Search
            placeholder="Search documents..."
            allowClear
            onSearch={handleSearch}
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            icon={<i className="las la-plus" />}
            onClick={() => setIsCreateModalVisible(true)}
          >
            New Document
          </Button>
        </div>

        <Table
          dataSource={documents}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title="Create New Document"
          open={isCreateModalVisible}
          onCancel={() => setIsCreateModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateDocument} layout="vertical">
            <Form.Item
              name="title"
              label="Document Title"
              rules={[{ required: true, message: 'Please enter a title' }]}
            >
              <Input placeholder="Enter document title" />
            </Form.Item>
            <Form.Item name="folderId" label="Folder">
              <Select placeholder="Select a folder">
                <Select.Option value={null}>Root</Select.Option>
                {folders?.map(folder => (
                  <Select.Option key={folder.id} value={folder.id}>
                    {folder.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Document
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
