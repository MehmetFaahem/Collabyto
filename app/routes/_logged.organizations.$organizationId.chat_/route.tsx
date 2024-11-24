import {
  Typography,
  Input,
  Button,
  List,
  Card,
  Avatar,
  Dropdown,
  Space,
  Modal,
  Form,
} from 'antd'
import { useState, useEffect, useRef } from 'react'
const { Title, Text } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

type Message = {
  id: string
  content: string
  createdAt: Date
  user?: {
    id: string
    name: string
    pictureUrl?: string
  }
}

type Channel = {
  id: string
  name: string
  messages?: Message[]
}

export default function ChatPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [searchText, setSearchText] = useState('')
  const [selectedChannel, setSelectedChannel] = useState<string>('')
  const [newChannelModalVisible, setNewChannelModalVisible] = useState(false)
  const [form] = Form.useForm()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messageText, setMessageText] = useState('')

  // Fetch channels
  const { data: channels, refetch: refetchChannels } =
    Api.channel.findMany.useQuery<Channel[]>({
      where: { organizationId },
      include: { messages: { include: { user: true } } },
    })

  // Fetch messages for selected channel
  const { data: messages, refetch: refetchMessages } =
    Api.message.findMany.useQuery<Message[]>(
      {
        where: { channelId: selectedChannel },
        include: { user: true },
        orderBy: { createdAt: 'asc' },
      },
      {
        enabled: !!selectedChannel,
      },
    )

  // Mutations
  const createChannel = Api.channel.create.useMutation()
  const createMessage = Api.message.create.useMutation()

  const handleCreateChannel = async (values: { name: string }) => {
    if (!organizationId || !values.name) return

    await createChannel.mutateAsync({
      data: {
        name: values.name,
        organizationId: organizationId,
      },
    })
    setNewChannelModalVisible(false)
    form.resetFields()
    refetchChannels()
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !selectedChannel || !user?.id) return

    await createMessage.mutateAsync({
      data: {
        content,
        channelId: selectedChannel,
        userId: user.id,
      },
    })
    refetchMessages()
    setMessageText('')
  }

  const filteredMessages = messages?.filter(message =>
    message.content.toLowerCase().includes(searchText.toLowerCase()),
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <Title level={2}>
            <i className="las la-comments" style={{ marginRight: '8px' }}></i>
            Team Chat
          </Title>
          <Text type="secondary">Communicate with your team in real-time</Text>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '250px 1fr',
            gap: '20px',
          }}
        >
          {/* Channels List */}
          <Card>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
                flexDirection: 'column',
              }}
            >
              <Button
                type="primary"
                icon={<i className="las la-plus"></i>}
                onClick={() => setNewChannelModalVisible(true)}
                style={{
                  marginBottom: '10px',
                }}
              >
                New Channel
              </Button>
              <Title level={4}>Channels</Title>
            </div>

            <List
              dataSource={channels}
              renderItem={channel => (
                <List.Item
                  onClick={() => setSelectedChannel(channel.id)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      selectedChannel === channel.id
                        ? '#f0f0f0'
                        : 'transparent',
                    padding: '8px',
                    borderRadius: '4px',
                  }}
                >
                  <i
                    className="las la-hashtag"
                    style={{ marginRight: '8px' }}
                  ></i>
                  {channel.name}
                </List.Item>
              )}
            />
          </Card>

          {/* Chat Area */}
          <Card>
            {selectedChannel ? (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <Input.Search
                    placeholder="Search messages..."
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: '300px' }}
                  />
                </div>

                <div
                  style={{
                    height: '400px',
                    overflowY: 'auto',
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <List
                    dataSource={filteredMessages}
                    renderItem={message => (
                      <List.Item
                        style={{
                          display: 'flex',
                          flexDirection:
                            message.user?.id === user?.id
                              ? 'row-reverse'
                              : 'row',
                          alignItems: 'flex-start',
                          justifyContent:
                            message.user?.id === user?.id ? 'end' : 'start',
                          marginBottom: '12px',
                          padding: '8px',
                          borderRadius: '8px',
                          maxWidth: '80%', // Adjusted to prevent full width
                          marginLeft:
                            message.user?.id === user?.id ? 'auto' : '0',
                          marginRight:
                            message.user?.id === user?.id ? '0' : 'auto',
                        }}
                      >
                        <Avatar
                          src={message.user?.pictureUrl}
                          style={{ margin: '0 10px' }}
                        />
                        <div
                          style={{
                            backgroundColor:
                              message.user?.id === user?.id
                                ? '#e0ffe0'
                                : '#f0f0f0',
                            borderRadius: '12px',
                            padding: '12px',
                            maxWidth: '80%', // Ensures the message content doesn't exceed the item width
                            wordBreak: 'break-word',
                          }}
                        >
                          <Space direction="vertical" size={4}>
                            <Text strong>{message.user?.name}</Text>
                            <Text>{message.content}</Text>
                            <Text
                              type="secondary"
                              style={{ fontSize: '12px', textAlign: 'right' }}
                            >
                              {dayjs(message.createdAt).format(
                                'MMM D, YYYY HH:mm',
                              )}
                            </Text>
                          </Space>
                        </div>
                      </List.Item>
                    )}
                  />
                  <div ref={messagesEndRef} />
                </div>

                <TextArea
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  onPressEnter={e => {
                    e.preventDefault()
                    handleSendMessage(messageText)
                  }}
                  style={{
                    borderRadius: '20px',
                    padding: '10px',
                    marginBottom: '10px',
                  }}
                />
                <Button
                  type="primary"
                  onClick={() => handleSendMessage(messageText)}
                  style={{
                    borderRadius: '20px',
                    width: '100%',
                  }}
                >
                  Send
                </Button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Text type="secondary">Select a channel to start chatting</Text>
              </div>
            )}
          </Card>
        </div>

        {/* New Channel Modal */}
        <Modal
          title="Create New Channel"
          open={newChannelModalVisible}
          onCancel={() => setNewChannelModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateChannel}>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: 'Please enter a channel name' },
              ]}
            >
              <Input
                prefix={<i className="las la-hashtag"></i>}
                placeholder="Channel name"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Channel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
