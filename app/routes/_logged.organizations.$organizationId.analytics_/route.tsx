import {
  Typography,
  Card,
  Row,
  Col,
  DatePicker,
  Button,
  Table,
  Space,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AnalyticsPage() {
  const { organizationId } = useParams()
  const { organization } = useUserContext()
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null,
  )

  // Fetch analytics data
  const { data: documents } = Api.document.findMany.useQuery({
    where: { organizationId },
    include: { owner: true },
  })

  const { data: tasks } = Api.task.findMany.useQuery({
    where: { board: { organizationId } },
    include: { assignee: true },
  })

  // Filter data based on date range
  const filteredDocuments = documents?.filter(
    doc =>
      !dateRange ||
      (dayjs(doc.createdAt).isAfter(dateRange[0]) &&
        dayjs(doc.createdAt).isBefore(dateRange[1])),
  )

  const filteredTasks = tasks?.filter(
    task =>
      !dateRange ||
      (dayjs(task.createdAt).isAfter(dateRange[0]) &&
        dayjs(task.createdAt).isBefore(dateRange[1])),
  )

  // Calculate metrics
  const completedTasks =
    filteredTasks?.filter(task => task.status === 'completed').length || 0
  const totalTasks = filteredTasks?.length || 0
  const totalDocuments = filteredDocuments?.length || 0

  const documentColumns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Owner', dataIndex: ['owner', 'name'], key: 'owner' },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
  ]

  const taskColumns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Assignee', dataIndex: ['assignee', 'name'], key: 'assignee' },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
  ]

  const handleExport = () => {
    const data = {
      documents: filteredDocuments,
      tasks: filteredTasks,
      metrics: {
        completedTasks,
        totalTasks,
        totalDocuments,
      },
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-${dayjs().format('YYYY-MM-DD')}.json`
    a.click()
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Title level={2}>
          <i className="las la-chart-line" style={{ marginRight: '8px' }}></i>
          Analytics Dashboard
        </Title>
        <Text type="secondary">
          View and analyze workspace activity metrics for {organization?.name}
        </Text>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24}>
            <Space>
              <RangePicker
                onChange={dates =>
                  setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
                }
                style={{ marginRight: '16px' }}
              />
              <Button
                type="primary"
                onClick={handleExport}
                icon={<i className="las la-download"></i>}
              >
                Export Data
              </Button>
            </Space>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24} sm={8}>
            <Card>
              <Title level={4}>
                <i
                  className="las la-file-alt"
                  style={{ marginRight: '8px' }}
                ></i>
                Documents
              </Title>
              <Text style={{ fontSize: '24px' }}>{totalDocuments}</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Title level={4}>
                <i className="las la-tasks" style={{ marginRight: '8px' }}></i>
                Total Tasks
              </Title>
              <Text style={{ fontSize: '24px' }}>{totalTasks}</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Title level={4}>
                <i
                  className="las la-check-circle"
                  style={{ marginRight: '8px' }}
                ></i>
                Completed Tasks
              </Title>
              <Text style={{ fontSize: '24px' }}>{completedTasks}</Text>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24}>
            <Card>
              <Title level={4}>Document Activity</Title>
              <Table
                dataSource={filteredDocuments}
                columns={documentColumns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
          <Col xs={24}>
            <Card>
              <Title level={4}>Task Activity</Title>
              <Table
                dataSource={filteredTasks}
                columns={taskColumns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
