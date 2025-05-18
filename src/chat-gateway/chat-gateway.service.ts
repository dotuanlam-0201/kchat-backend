import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { throwInternalServerError } from 'src/lib/function/catchError';
import { MessageDTO } from 'src/messages/dto/dto.message';
import { MessagesService } from 'src/messages/messages.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { Room } from 'src/schema/room.schema';
import { SOCKET } from 'src/types/enum';
@Injectable()
export class ChatGatewayService {
  constructor(
    private readonly messageService: MessagesService,
    @Inject(forwardRef(() => RoomsService)) private readonly roomService: RoomsService
  ) { }
  private onlineUsers: Map<string, string> = new Map(); // Map<userId, socketId>
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }
  emitRoomCreated(room: Room) {
    this.server?.emit(SOCKET.roomCreated, room);
  }

  setUserOnline(userId: string, socketId: string) {
    this.onlineUsers.set(userId, socketId);
  }

  setUserOffline(userId: string) {
    this.onlineUsers.delete(userId);
  }

  getOnlineUsers(): Map<string, string> {
    return this.onlineUsers;
  }
  async addMessage(dto: MessageDTO) {
    try {
      const message = await this.messageService.addMessage(dto)
      await this.roomService.setLastMessage(dto.roomId, message?._id)
      return message
    } catch (error) {
      throwInternalServerError(error)
    }
  }
  async upDateMessage(dto: MessageDTO) {
    return this.messageService.updateMessage(dto)
  }
}
