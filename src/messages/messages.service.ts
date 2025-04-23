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
      return await new this.messageModel.save(dto)
    } catch (error) {
      catchError(error)
    }
  }
}
