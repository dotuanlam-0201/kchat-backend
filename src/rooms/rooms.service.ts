import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatusCode } from 'axios';
import { Model } from 'mongoose';
import { throwInternalServerError } from 'src/lib/catchError';
import { RoomDTO } from 'src/rooms/dto/room.dto';
import { Room } from 'src/schema/room.schema';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) { }
  async addRoom(dto: RoomDTO) {
    try {
      const checkExistRoom = await this.roomModel.findOne({
        ...dto
      })
      if (checkExistRoom) throw new HttpException('Room is exist!', HttpStatusCode.BadRequest)
      return await new this.roomModel(dto).save()
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
}
