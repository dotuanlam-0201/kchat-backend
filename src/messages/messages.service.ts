import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError } from 'rxjs';
import { MessageDTO } from 'src/messages/dto/dto.message';
import { Message } from 'src/schema/message.schema';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) { }
  async addMessage(dto) {
    try {
      return await new this.messageModel(dto).save()
    } catch (error) {
      catchError(error)
    }
  }
  async getMessages(roomId?: string) {
    try {
      return this.messageModel.find({
        roomId: roomId
      }).populate('author').sort({ 'createdAt': 1 }).exec()
    } catch (error) {
      catchError(error)
    }
  }
  async updateMessage(message: MessageDTO) {
    try {
      return this.messageModel.findByIdAndUpdate(message._id, message)
    } catch (error) {
      catchError(error)
    }
  }
}
