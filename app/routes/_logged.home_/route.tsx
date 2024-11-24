import { Typography, Card, Row, Col, Space } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={1} style={{ textAlign: 'center', marginBottom: 48 }}>
          Welcome to Our Collaboration Platform
        </Title>

        <Text
          style={{
            display: 'block',
            textAlign: 'center',
            fontSize: 18,
            marginBottom: 48,
          }}
        >
          Your all-in-one workspace for documents, tasks, chat, and file
          management
        </Text>

        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} lg={6}>
            <Card style={{ height: '100%' }}>
              <Space
                direction="vertical"
                align="center"
                style={{ width: '100%' }}
              >
                <i
                  className="las la-file-alt"
                  style={{ fontSize: 48, color: '#1890ff' }}
                ></i>
                <Title level={4}>Documents</Title>
                <Text style={{ textAlign: 'center' }}>
                  Create, edit, and organize your documents in a structured
                  workspace
                </Text>
              </Space>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card style={{ height: '100%' }}>
              <Space
                direction="vertical"
                align="center"
                style={{ width: '100%' }}
              >
                <i
                  className="las la-tasks"
                  style={{ fontSize: 48, color: '#52c41a' }}
                ></i>
                <Title level={4}>Task Management</Title>
                <Text style={{ textAlign: 'center' }}>
                  Track projects and assignments with our intuitive task boards
                </Text>
              </Space>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card style={{ height: '100%' }}>
              <Space
                direction="vertical"
                align="center"
                style={{ width: '100%' }}
              >
                <i
                  className="las la-comments"
                  style={{ fontSize: 48, color: '#722ed1' }}
                ></i>
                <Title level={4}>Team Chat</Title>
                <Text style={{ textAlign: 'center' }}>
                  Communicate with your team in real-time through dedicated
                  channels
                </Text>
              </Space>
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card style={{ height: '100%' }}>
              <Space
                direction="vertical"
                align="center"
                style={{ width: '100%' }}
              >
                <i
                  className="las la-folder-open"
                  style={{ fontSize: 48, color: '#fa8c16' }}
                ></i>
                <Title level={4}>File Storage</Title>
                <Text style={{ textAlign: 'center' }}>
                  Upload, organize, and share files securely with your team
                </Text>
              </Space>
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: 48 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Title level={3}>Getting Started</Title>
            <Space direction="vertical">
              <Text>
                <i
                  className="las la-check-circle"
                  style={{ color: '#52c41a', marginRight: 8 }}
                ></i>
                Join or create an organization to start collaborating
              </Text>
              <Text>
                <i
                  className="las la-check-circle"
                  style={{ color: '#52c41a', marginRight: 8 }}
                ></i>
                Invite team members to your workspace
              </Text>
              <Text>
                <i
                  className="las la-check-circle"
                  style={{ color: '#52c41a', marginRight: 8 }}
                ></i>
                Create documents, assign tasks, and communicate with your team
              </Text>
              <Text>
                <i
                  className="las la-check-circle"
                  style={{ color: '#52c41a', marginRight: 8 }}
                ></i>
                Organize your files and keep everything in one place
              </Text>
            </Space>
          </Space>
        </Card>
      </div>
    </PageLayout>
  )
}
