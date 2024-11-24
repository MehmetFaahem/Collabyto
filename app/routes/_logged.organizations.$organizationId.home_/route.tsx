import { Card, Col, Row, Typography, Avatar, Statistic, List } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DashboardPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()

  // Fetch recent documents
  const { data: recentDocuments } = Api.document.findMany.useQuery({
    where: { organizationId },
    orderBy: { updatedAt: 'desc' },
    take: 5,
    include: { owner: true },
  })

  // Fetch recent tasks
  const { data: recentTasks } = Api.task.findMany.useQuery({
    where: { board: { organizationId } },
    orderBy: { updatedAt: 'desc' },
    take: 5,
    include: { assignee: true },
  })

  // Fetch organization members
  const { data: organizationRoles } = Api.organizationRole.findMany.useQuery({
    where: { organizationId },
    include: { user: true },
  })

  // Fetch workspace statistics
  const { data: documentsCount } = Api.document.findMany.useQuery({
    where: { organizationId },
    _count: true,
  })

  const { data: tasksCount } = Api.task.findMany.useQuery({
    where: { board: { organizationId } },
    _count: true,
  })

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-tachometer-alt" style={{ marginRight: 8 }} />
          Workspace Dashboard
        </Title>
        <Text type="secondary">
          Overview of your workspace activities and metrics
        </Text>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {/* Statistics Cards */}
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Documents"
                value={documentsCount?._count || 0}
                prefix={<i className="las la-file-alt" />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Tasks"
                value={tasksCount?._count || 0}
                prefix={<i className="las la-tasks" />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Team Members"
                value={organizationRoles?.length || 0}
                prefix={<i className="las la-users" />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Projects"
                value={
                  recentTasks?.filter(t => t.status !== 'completed').length || 0
                }
                prefix={<i className="las la-project-diagram" />}
              />
            </Card>
          </Col>

          {/* Recent Activities */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  <i className="las la-history" /> Recent Documents
                </>
              }
            >
              <List
                dataSource={recentDocuments}
                renderItem={doc => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={doc.owner?.pictureUrl} />}
                      title={doc.title}
                      description={`Updated ${dayjs(
                        doc.updatedAt,
                      ).fromNow()} by ${doc.owner?.name}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card
              title={
                <>
                  <i className="las la-clipboard-list" /> Recent Tasks
                </>
              }
            >
              <List
                dataSource={recentTasks}
                renderItem={task => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={task.assignee?.pictureUrl} />}
                      title={task.title}
                      description={
                        <>
                          <Text type="secondary">Status: </Text>
                          <Text strong>{task.status}</Text>
                          {task.dueDate && (
                            <>
                              {' '}
                              · Due {dayjs(task.dueDate).format('MMM D, YYYY')}
                            </>
                          )}
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Team Members */}
          <Col xs={24}>
            <Card
              title={
                <>
                  <i className="las la-users" /> Active Team Members
                </>
              }
            >
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
                dataSource={organizationRoles}
                renderItem={role => (
                  <List.Item>
                    <Card bordered={false}>
                      <Card.Meta
                        avatar={
                          <Avatar size={64} src={role.user?.pictureUrl} />
                        }
                        title={role.user?.name}
                        description={
                          <>
                            <Text type="secondary">{role.name}</Text>
                            <br />
                            <Text type="secondary">
                              <i className="las la-envelope" />{' '}
                              {role.user?.email}
                            </Text>
                          </>
                        }
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
