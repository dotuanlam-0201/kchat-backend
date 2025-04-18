import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SOCKET_MESSAGE } from 'src/types/enum';
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
  @SubscribeMessage(SOCKET_MESSAGE.joinRoom)
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId)
    client.emit(`joined room: ${roomId}`)
    this.logger.log(`joined room: ${roomId}`)
  }
}
