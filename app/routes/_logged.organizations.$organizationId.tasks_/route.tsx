import {
  Typography,
  Card,
  Input,
  Button,
  Modal,
  Form,
  Select,
  Space,
  Row,
  Col,
  Empty,
  Spin,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TasksPage() {
  const { organization } = useUserContext()
  const { organizationId } = useParams()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [form] = Form.useForm()

  // Fetch all boards
  const {
    data: boards,
    isLoading: loadingBoards,
    refetch: refetchBoards,
  } = Api.board.findMany.useQuery({
    where: { organizationId },
    include: { tasks: true },
  })

  // Create board mutation
  const { mutateAsync: createBoard } = Api.board.create.useMutation()

  // Filter tasks across all boards
  const filteredBoards = boards?.map(board => ({
    ...board,
    tasks: board.tasks.filter(
      task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }))

  const handleCreateBoard = async (values: { name: string }) => {
    try {
      await createBoard({
        data: {
          name: values.name,
          organizationId,
        },
      })
      setIsCreateModalOpen(false)
      form.resetFields()
      refetchBoards()
    } catch (error) {
      console.error('Error creating board:', error)
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <div
          style={{
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <Title level={2}>
              <i
                className="las la-clipboard-list"
                style={{ marginRight: '8px' }}
              ></i>
              Kanban Boards
            </Title>
            <Text type="secondary">
              Manage and organize your tasks across different boards
            </Text>
          </div>
          <Button type="primary" onClick={() => setIsCreateModalOpen(true)}>
            <i className="las la-plus" style={{ marginRight: '4px' }}></i>
            Create Board
          </Button>
        </div>

        <Card style={{ marginBottom: '24px' }}>
          <Input.Search
            placeholder="Search tasks across all boards..."
            onChange={e => setSearchQuery(e.target.value)}
            style={{ maxWidth: '400px' }}
            prefix={<i className="las la-search"></i>}
          />
        </Card>

        {loadingBoards ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {filteredBoards?.map(board => (
              <Col xs={24} sm={12} lg={8} xl={6} key={board.id}>
                <Card
                  title={
                    <Space>
                      <i className="las la-columns"></i>
                      {board.name}
                    </Space>
                  }
                  extra={
                    <Text type="secondary">{board.tasks.length} tasks</Text>
                  }
                  hoverable
                  onClick={() =>
                    navigate(
                      `/organizations/${organizationId}/tasks/${board.id}`,
                    )
                  }
                >
                  <div>
                    <Text type="secondary">
                      Created {dayjs(board.createdAt).format('MMM D, YYYY')}
                    </Text>
                    {board.tasks.length > 0 ? (
                      <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
                        {board.tasks.slice(0, 3).map(task => (
                          <li key={task.id}>
                            <Text ellipsis>{task.title}</Text>
                          </li>
                        ))}
                        {board.tasks.length > 3 && (
                          <Text type="secondary">
                            + {board.tasks.length - 3} more tasks
                          </Text>
                        )}
                      </ul>
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description="No tasks yet"
                      />
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Modal
          title="Create New Board"
          open={isCreateModalOpen}
          onCancel={() => setIsCreateModalOpen(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateBoard} layout="vertical">
            <Form.Item
              name="name"
              label="Board Name"
              rules={[{ required: true, message: 'Please enter a board name' }]}
            >
              <Input prefix={<i className="las la-clipboard-list"></i>} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Board
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
