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
  Dropdown,
  Checkbox,
  Popconfirm,
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
  const [filterType, setFilterType] = useState<string>('all')
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
  const [sortedInfo, setSortedInfo] = useState<any>({})
  const [form] = Form.useForm()
  const navigate = useNavigate()

  // Fetch documents with folders and owners
  const { data: documents, refetch } = Api.document.findMany.useQuery({
    where: {
      organizationId,
      title: { contains: searchText, mode: 'insensitive' },
      ...(filterType === 'created' && { ownerId: user!.id }),
      ...(filterType === 'shared' && { ownerId: { not: user!.id } }),
    },
    include: {
      folder: true,
      owner: true,
    },
    orderBy: sortedInfo.field ? { [sortedInfo.field]: sortedInfo.order === 'ascend' ? 'asc' : 'desc' } : { updatedAt: 'desc' },
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

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedRowKeys.map(id =>
          Api.document.delete.mutate({ where: { id } })
        )
      )
      message.success('Documents deleted successfully')
      setSelectedRowKeys([])
      refetch()
    } catch (error) {
      message.error('Failed to delete documents')
    }
  }

  const handleBulkMove = async (folderId: string | null) => {
    try {
      await Promise.all(
        selectedRowKeys.map(id =>
          Api.document.update.mutate({
            where: { id },
            data: { folderId }
          })
        )
      )
      message.success('Documents moved successfully')
      setSelectedRowKeys([])
      refetch()
    } catch (error) {
      message.error('Failed to move documents')
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      render: (text: string, record: any) => (
        <Space>
          <i className="las la-file-alt" />
          <Text onClick={() => navigate(`${record.id}`)} style={{ cursor: 'pointer' }}>{text}</Text>
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
      title: 'Last Modified',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: true,
      render: (date: string) => dayjs(date).fromNow(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button type="text" icon={<i className="las la-edit" />} onClick={() => navigate(`${record.id}`)} />
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleBulkDelete([record.id])}
          >
            <Button type="text" danger icon={<i className="las la-trash" />} />
          </Popconfirm>
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
          <Space>
            <Search
              placeholder="Search documents..."
              allowClear
              onSearch={handleSearch}
              style={{ width: 300 }}
            />
            <Dropdown
              menu={{
                items: [
                  { key: 'all', label: 'All Documents' },
                  { key: 'recent', label: 'Recently Modified' },
                  { key: 'created', label: 'Created by Me' },
                  { key: 'shared', label: 'Shared with Me' },
                ],
                onClick: ({ key }) => setFilterType(key),
              }}
            >
              <Button>
                Filter <i className="las la-angle-down" />
              </Button>
            </Dropdown>
          </Space>
          <Button
            type="primary"
            icon={<i className="las la-plus" />}
            onClick={() => setIsCreateModalVisible(true)}
          >
            New Document
          </Button>
        </div>

        <div style={{ marginBottom: 16 }}>
          {selectedRowKeys.length > 0 && (
            <Space>
              <Popconfirm
                title="Are you sure you want to delete these documents?"
                onConfirm={handleBulkDelete}
              >
                <Button danger>Delete Selected</Button>
              </Popconfirm>
              <Select
                placeholder="Move to folder"
                style={{ width: 200 }}
                onChange={handleBulkMove}
              >
                <Select.Option value={null}>Root</Select.Option>
                {folders?.map(folder => (
                  <Select.Option key={folder.id} value={folder.id}>
                    {folder.name}
                  </Select.Option>
                ))}
              </Select>
            </Space>
          )}
        </div>

        <Table
          dataSource={documents}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys as string[]),
          }}
          onChange={(pagination, filters, sorter) => {
            setSortedInfo(sorter);
          }}
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
