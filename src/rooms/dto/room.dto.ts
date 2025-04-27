import { ApiProperty } from '@nestjs/swagger';
import { ROOM_TYPE } from 'src/types/enum';

export class RoomDTO {
  @ApiProperty({ required: true, example: [] })
  participants: string[]; // array of User IDs (ObjectId as string)
  @ApiProperty({ example: '', required: true })
  lastMessage?: string;
  @ApiProperty({ required: true, example: ROOM_TYPE.single })  // array of Message IDs (optional)
  type: ROOM_TYPE;
}