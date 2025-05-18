import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import { Model, Types } from 'mongoose';
import { ChatGatewayService } from 'src/chat-gateway/chat-gateway.service';
import { throwInternalServerError } from 'src/lib/function/catchError';
import { RoomDTO } from 'src/rooms/dto/room.dto';
import { Room } from 'src/schema/room.schema';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>, @Inject(forwardRef(() => ChatGatewayService)) private chatGateWayService: ChatGatewayService) { }
  async addRoom(dto: RoomDTO) {
    try {
      const checkIsExistRoom = await this.roomModel.findOne({
        participants: { $all: dto.participants }
      })
      if (checkIsExistRoom) throw new HttpException('This conversation is exist!', HttpStatusCode.BadRequest)
      const room = await (await new this.roomModel(dto).save()).populate('participants')
      this.chatGateWayService.emitRoomCreated(room)
      return room
    } catch (error) {
      throwInternalServerError(error)
    }
  }
  async deleteRoom(id: string) {
    try {
      return await this.roomModel.findByIdAndDelete(id)
    } catch (error) {
      throwInternalServerError(error)
    }
  }
  async getRooms(userId?: string) {
    try {
      return await this.roomModel.find({
        participants: userId
      }).populate('participants').populate('lastMessage')
    } catch (error) {
      throwInternalServerError(error)
    }
  }
  async setLastMessage(id: string, messageId?: Types.ObjectId) {
    try {
      return await this.roomModel.findByIdAndUpdate(id, {
        $set: {
          lastMessage: messageId
        }
      })
    } catch (error) {
      throwInternalServerError(error)
    }
  }
}
