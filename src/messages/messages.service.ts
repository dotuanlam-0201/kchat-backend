import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { throwInternalServerError } from 'src/lib/function/catchError';
import { MessageDTO } from 'src/messages/dto/dto.message';
import { Message } from 'src/schema/message.schema';
import { QueryParameterBag } from './../../node_modules/@smithy/types/dist-types/http.d';

@Injectable()
export class MessagesService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) { }
  async addMessage(dto) {
    try {
      return await new this.messageModel(dto).save()
    } catch (error) {
      throwInternalServerError(error)
    }
  }
  async getMessages(query: QueryParameterBag, roomId?: string,) {
    const limit = Number(query?.limit)
    try {
      return await this.messageModel.find({
        roomId: roomId
      }).sort({ createdAt: -1 }).limit(limit).populate('author').exec()
    } catch (error) {
      throwInternalServerError(error)
    }
  }
  async updateMessage(message: MessageDTO) {
    try {
      return this.messageModel.findByIdAndUpdate(message._id, message)
    } catch (error) {
      throwInternalServerError(error)
    }
  }
}
