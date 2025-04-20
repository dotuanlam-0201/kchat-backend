import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET } from 'src/types/enum';
import { ChatGatewayService } from './chat-gateway.service';

@WebSocketGateway(80, {
  namespace: 'events',
  transports: ['websocket'],
  cors: {
    origin: '*'
  }
})
export class ChatGatewayGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger()
  @WebSocketServer()
  private server: Server;
  constructor(private readonly chatGatewayService: ChatGatewayService) { }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Connected: ${client.id}`)
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Disconnected: ${client.id}`)
  }
  @SubscribeMessage(SOCKET.joinRoom)
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {
    this.server.socketsJoin(roomId);
    this.logger.log(`Client ${client.id} joined room: ${roomId}`);
    client.emit(SOCKET.joinRoom, { roomId });
  }
  @SubscribeMessage(SOCKET.sendMessage)
  handleSendMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: Record<string, any>) {
    const { message, roomId } = payload
    this.server.to(roomId).emit(SOCKET.getMessages, message)
    this.logger.log(payload)
  }
}
