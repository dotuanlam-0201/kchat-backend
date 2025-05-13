import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDTO } from 'src/messages/dto/dto.message';
import { UserDocument } from 'src/schema/user.schema';
import { SOCKET } from 'src/types/enum';
import { UserService } from 'src/user/user.service';
import { ChatGatewayService } from './chat-gateway.service';
@WebSocketGateway({
  namespace: 'events',
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*',
    credentials: true, // This is CRUCIAL for cookies
    allowedHeaders: ["token"],
  },
  allowEIO3: true,
})

export class ChatGatewayGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private logger = new Logger()
  @WebSocketServer()
  private server: Server;
  constructor(
    private readonly chatGatewayService: ChatGatewayService,
    private readonly userService: UserService,
  ) { }
  afterInit(server: Socket) {
    this.logger.log('WebSocket Gateway Initialized');
  }
  async handleConnection(socket: Socket, ...args: any[]) {
    const { userId } = await this.getUserFromCookie(socket);
    if (userId) {
      this.chatGatewayService.setUserOnline(userId, socket.id)
      socket.data.userId = userId
    }
    this.logger.log(`Connected: ${socket.id}`)
    this.broadcastOnlineUsers()
  }
  async handleDisconnect(socket: Socket) {
    const userId = socket.data.userId;
    if (userId) {
      this.chatGatewayService.setUserOffline(userId)
      this.logger.log(`User ${userId} disconnected with socket ID ${socket.id}`);
      this.broadcastOnlineUsers();
    } else {
      this.logger.warn(`Disconnect: No userId found for socket ${socket.id}`);
    }
  }
  @SubscribeMessage(SOCKET.joinRoom)
  handleJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() roomId: string) {
    socket.join(roomId)
    this.logger.log(`socket ${socket.id} joined room: ${roomId}`);
    socket.emit(SOCKET.joinRoom, { roomId });
  }
  @SubscribeMessage(SOCKET.sendMessage)
  async handleSendMessage(@ConnectedSocket() socket: Socket, @MessageBody() payload: MessageDTO) {
    const { roomId, author } = payload
    const authorInfo = await this.userService.getUserById(author)
    const response = {
      ...payload, ...{
        author: authorInfo
      }
    }
    this.logger.log(`Broadcasting to room ${roomId}: ${JSON.stringify(response)}`);
    this.server.to(roomId).emit(SOCKET.getMessages, response)
    this.server.emit(SOCKET.updateLastMessage, response)
    await this.chatGatewayService.addMessage(payload)
  }
  private broadcastOnlineUsers() {
    const onlineUserIds = Array.from(this.chatGatewayService.getOnlineUsers().keys());
    this.logger.log(`Broadcasting online users: ${onlineUserIds.join(', ') || 'none'}`);
    this.server.emit(SOCKET.onlineUsers, onlineUserIds)
  }
  async getUserFromCookie(socket: Socket): Promise<{ user: UserDocument | null; userId: string | null }> {
    const token = socket.handshake.auth?.token
    try {
      const user = await this.userService.getUserFromToken(token)
      if (!user) return {
        user: null,
        userId: null
      }
      const userId = user?._id.toString()
      return { user, userId }
    } catch (error) {
      return {
        user: null,
        userId: null
      }
    }
  }
}
