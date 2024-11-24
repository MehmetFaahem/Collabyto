import {
  Typography,
  Input,
  Button,
  Table,
  Modal,
  Upload,
  Space,
  Dropdown,
  Menu,
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

export default function FilesPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [isCreateFolderModalVisible, setIsCreateFolderModalVisible] =
    useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const { mutateAsync: upload } = useUploadPublic()

  // Fetch folders
  const { data: folders } = Api.folder.findMany.useQuery({
    where: { organizationId },
    include: { files: true },
  })

  // Fetch files
  const { data: files, refetch: refetchFiles } = Api.file.findMany.useQuery({
    where: {
      organizationId,
      folderId: selectedFolder,
      name: { contains: searchTerm, mode: 'insensitive' },
    },
    include: { owner: true },
  })

  // Mutations
  const { mutateAsync: createFolder } = Api.folder.create.useMutation()
  const { mutateAsync: createFile } = Api.file.create.useMutation()
  const { mutateAsync: deleteFile } = Api.file.delete.useMutation()

  const handleCreateFolder = async () => {
    try {
      await createFolder({
        data: {
          name: newFolderName,
          organizationId,
          parentFolderId: selectedFolder,
        },
      })
      setIsCreateFolderModalVisible(false)
      setNewFolderName('')
      message.success('Folder created successfully')
    } catch (error) {
      message.error('Failed to create folder')
    }
  }

  const handleFileUpload = async (file: File) => {
    try {
      const { url } = await upload({ file })
      await createFile({
        data: {
          name: file.name,
          url,
          type: file.type,
          size: (file.size / 1024).toFixed(2) + ' KB',
          organizationId,
          folderId: selectedFolder,
          ownerId: user?.id || '',
        },
      })
      refetchFiles()
      message.success('File uploaded successfully')
    } catch (error) {
      message.error('Failed to upload file')
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <i
            className={`las ${
              record.type?.includes('image') ? 'la-image' : 'la-file'
            }`}
          />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Owner',
      dataIndex: ['owner', 'name'],
      key: 'owner',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Last Modified',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                onClick={() => window.open(record.url, '_blank')}
              >
                <i className="las la-eye" /> Preview
              </Menu.Item>
              <Menu.Item key="2" onClick={() => handleFileDelete(record.id)}>
                <i className="las la-trash" /> Delete
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="text">
            <i className="las la-ellipsis-v" />
          </Button>
        </Dropdown>
      ),
    },
  ]

  const handleFileDelete = async (fileId: string) => {
    try {
      await deleteFile({ where: { id: fileId } })
      refetchFiles()
      message.success('File deleted successfully')
    } catch (error) {
      message.error('Failed to delete file')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-folder" /> File Management
        </Title>
        <Text type="secondary">
          Upload, organize, and manage your files and folders
        </Text>

        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <Button
            type="primary"
            onClick={() => setIsCreateFolderModalVisible(true)}
          >
            <i className="las la-folder-plus" /> New Folder
          </Button>
          <Upload
            customRequest={({ file }) => handleFileUpload(file as File)}
            showUploadList={false}
          >
            <Button>
              <i className="las la-upload" /> Upload File
            </Button>
          </Upload>
          <Search
            placeholder="Search files..."
            onChange={e => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />
        </div>

        <div style={{ marginTop: '24px' }}>
          <Table
            dataSource={files}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>

        <Modal
          title="Create New Folder"
          open={isCreateFolderModalVisible}
          onOk={handleCreateFolder}
          onCancel={() => setIsCreateFolderModalVisible(false)}
        >
          <Input
            placeholder="Folder name"
            value={newFolderName}
            onChange={e => setNewFolderName(e.target.value)}
          />
        </Modal>
      </div>
    </PageLayout>
  )
}
