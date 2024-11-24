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
import { useState } from 'react'
const { Title, Text } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { SocketClient } from '@/plugins/socket/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ChatPage() {
  const { organizationId } = useParams()
  const { user } = useUserContext()
  const [searchText, setSearchText] = useState('')
  const [selectedChannel, setSelectedChannel] = useState<string>('')
  const [newChannelModalVisible, setNewChannelModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Fetch channels
  const { data: channels, refetch: refetchChannels } =
    Api.channel.findMany.useQuery({
      where: { organizationId },
      include: { messages: { include: { user: true } } },
    })

  // Fetch messages for selected channel
  const { data: messages, refetch: refetchMessages } =
    Api.message.findMany.useQuery(
      {
        where: { channelId: selectedChannel },
        include: { user: true },
        orderBy: { createdAt: 'desc' },
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
  }

  const filteredMessages = messages?.filter(message =>
    message.content.toLowerCase().includes(searchText.toLowerCase()),
  )

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
              }}
            >
              <Title level={4}>Channels</Title>
              <Button
                type="primary"
                icon={<i className="las la-plus"></i>}
                onClick={() => setNewChannelModalVisible(true)}
              >
                New Channel
              </Button>
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
                  }}
                >
                  <List
                    dataSource={filteredMessages}
                    renderItem={message => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={message.user?.pictureUrl} />}
                          title={
                            <Space>
                              <Text strong>{message.user?.name}</Text>
                              <Text
                                type="secondary"
                                style={{ fontSize: '12px' }}
                              >
                                {dayjs(message.createdAt).format(
                                  'MMM D, YYYY HH:mm',
                                )}
                              </Text>
                            </Space>
                          }
                          description={message.content}
                        />
                      </List.Item>
                    )}
                  />
                </div>

                <TextArea
                  placeholder="Type your message..."
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  onPressEnter={e => {
                    e.preventDefault()
                    handleSendMessage((e.target as HTMLTextAreaElement).value)
                    ;(e.target as HTMLTextAreaElement).value = ''
                  }}
                />
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
