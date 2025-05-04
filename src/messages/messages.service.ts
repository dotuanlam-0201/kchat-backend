import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError } from 'rxjs';
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
      }).populate('author').sort({ 'createdAt': 1 }).limit(100).exec()
    } catch (error) {
      catchError(error)
    }
  }
}
