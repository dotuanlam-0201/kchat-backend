import { Body, Controller, Delete, Get, Param, Post, Request } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { get } from 'lodash';
import { RoomDTO } from 'src/rooms/dto/room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Post('/add')
  addRoom(@Body() dto: RoomDTO) {
    return this.roomsService.addRoom(dto)
  }

  @Delete('/:id')
  @ApiParam({
    name: "id"
  })
  deleteRoom(@Param() param: Record<string, string>) {
    return this.roomsService.deleteRoom(param.id)
  }
  @Get('/')
  getRooms(@Request() rq: Request) {
    const userId = get(rq, 'user._id')
    return this.roomsService.getRooms(userId)
  }
}
