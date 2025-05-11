import { Injectable } from '@nestjs/common';
import { catchError } from 'rxjs';
import { MessageDTO } from 'src/messages/dto/dto.message';
import { MessagesService } from 'src/messages/messages.service';
import { RoomsService } from 'src/rooms/rooms.service';
@Injectable()
export class ChatGatewayService {
  constructor(
    private readonly messageService: MessagesService,
    private readonly roomService: RoomsService
  ) { }
  private onlineUsers: Map<string, string> = new Map(); // Map<userId, socketId>

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
      catchError(error)
    }
  }
  async upDateMessage(dto: MessageDTO) {
    return this.messageService.updateMessage(dto)
  }
}
