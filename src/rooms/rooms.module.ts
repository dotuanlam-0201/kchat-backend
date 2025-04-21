import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/schema/room.schema';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  imports: [
    MongooseModule.forFeature([{
      name: Room.name,
      schema: RoomSchema
    }])
  ]
})
export class RoomsModule { }
