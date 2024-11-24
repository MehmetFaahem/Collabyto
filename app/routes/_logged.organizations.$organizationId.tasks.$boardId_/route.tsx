import {
  Typography,
  Card,
  Space,
  Button,
  Input,
  Select,
  DatePicker,
  Modal,
  Form,
  Tag,
  Dropdown,
  Menu,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const TASK_STATUSES = ['TODO', 'IN_PROGRESS', 'DONE']
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH']
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TaskBoardPage() {
  const { boardId } = useParams()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [form] = Form.useForm()

  const { data: board, refetch: refetchBoard } = Api.board.findFirst.useQuery({
    where: { id: boardId },
    include: { tasks: true },
  })

  const { data: users } = Api.user.findMany.useQuery({})

  const { mutateAsync: createTask } = Api.task.create.useMutation()
  const { mutateAsync: updateTask } = Api.task.update.useMutation()

  const handleCreateTask = async values => {
    await createTask({
      data: {
        ...values,
        boardId,
        status: 'TODO',
      },
    })
    setIsModalVisible(false)
    form.resetFields()
    refetchBoard()
  }

  const handleUpdateTask = async values => {
    await updateTask({
      where: { id: editingTask.id },
      data: values,
    })
    setIsModalVisible(false)
    setEditingTask(null)
    form.resetFields()
    refetchBoard()
  }

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    await updateTask({
      where: { id: taskId },
      data: { status: newStatus },
    })
    refetchBoard()
  }

  const openTaskModal = (task = null) => {
    if (task) {
      setEditingTask(task)
      form.setFieldsValue({
        ...task,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null,
      })
    }
    setIsModalVisible(true)
  }

  const renderTaskCard = task => (
    <Card
      key={task.id}
      size="small"
      style={{
        marginBottom: '8px',
        cursor: 'pointer',
      }}
    >
      <Text strong>{task.title}</Text>
      <div style={{ marginTop: '8px' }}>
        {task.priority && (
          <Tag
            color={
              task.priority === 'HIGH'
                ? 'red'
                : task.priority === 'MEDIUM'
                ? 'orange'
                : 'blue'
            }
          >
            {task.priority}
          </Tag>
        )}
        {task.dueDate && (
          <Text type="secondary" style={{ marginLeft: '8px' }}>
            Due: {dayjs(task.dueDate).format('MMM D, YYYY')}
          </Text>
        )}
      </div>
      <div
        style={{
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          type="link"
          onClick={() => openTaskModal(task)}
          style={{
            padding: 0,
          }}
        >
          Edit
        </Button>
        <Dropdown
          overlay={
            <Menu>
              {TASK_STATUSES.map(status => (
                <Menu.Item
                  key={status}
                  onClick={() => handleStatusChange(task.id, status)}
                >
                  {status}
                </Menu.Item>
              ))}
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="link" style={{ padding: 0 }}>
            Change Status
          </Button>
        </Dropdown>
      </div>
    </Card>
  )

  return (
    <PageLayout layout="full-width">
      <Space direction="vertical" style={{ width: '100%', padding: '24px' }}>
        <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Title level={2}>
            <i className="las la-tasks" /> {board?.name} Board
          </Title>
          <Button type="primary" onClick={() => openTaskModal()}>
            <i className="las la-plus" /> New Task
          </Button>
        </Space>

        <div style={{ display: 'flex', gap: '16px' }}>
          {TASK_STATUSES.map(status => (
            <div key={status} style={{ width: '33%', minHeight: '500px' }}>
              <Card title={status} style={{ backgroundColor: '#f5f5f5' }}>
                {board?.tasks
                  ?.filter(task => task.status === status)
                  ?.map(renderTaskCard)}
              </Card>
            </div>
          ))}
        </div>

        <Modal
          title={editingTask ? 'Edit Task' : 'New Task'}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false)
            setEditingTask(null)
            form.resetFields()
          }}
          footer={null}
        >
          <Form
            form={form}
            onFinish={editingTask ? handleUpdateTask : handleCreateTask}
            layout="vertical"
          >
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="assigneeId" label="Assignee">
              <Select allowClear>
                {users?.map(user => (
                  <Select.Option key={user.id} value={user.id}>
                    {user.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="priority" label="Priority">
              <Select allowClear>
                {PRIORITIES.map(priority => (
                  <Select.Option key={priority} value={priority}>
                    {priority}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="dueDate" label="Due Date">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingTask ? 'Update' : 'Create'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </PageLayout>
  )
}
