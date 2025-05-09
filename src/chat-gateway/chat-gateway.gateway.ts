import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDTO } from 'src/messages/dto/dto.message';
import { SOCKET } from 'src/types/enum';
import { UserService } from 'src/user/user.service';
import { ChatGatewayService } from './chat-gateway.service';

@WebSocketGateway({
  namespace: 'events',
  transports: ['websocket'],
  cors: {
    origin: '*'
  },
  allowEIO3: true
})

export class ChatGatewayGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger()
  @WebSocketServer()
  private server: Server;
  constructor(
    private readonly chatGatewayService: ChatGatewayService,
    private readonly userService: UserService,
  ) { }
  async handleConnection(socket: Socket, ...args: any[]) {
    this.logger.log(`Connected: ${socket.id}`)
  }
  handleDisconnect(socket: Socket) {
    this.logger.log(`Disconnected: ${socket.id}`)
  }
  @SubscribeMessage(SOCKET.joinRoom)
  handleJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() roomId: string) {
    this.server.socketsJoin(roomId)
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
    this.chatGatewayService.addMessage(payload)
  }
}
