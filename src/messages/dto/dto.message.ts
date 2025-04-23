import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MessageDTO {
  @ApiProperty({
    description: 'The unique identifier of the room where the message is sent',
    example: 'room-abc123',
  })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({
    description: 'The ID of the sender sending the message',
    example: 'user-xyz456',
  })
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @ApiProperty({
    description: 'The content of the message',
    example: 'Hello everyone!',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'Optional timestamp when the message was created',
    example: 1713886200000,
    required: false,
  })
  @IsOptional()
  timestamp?: number;
}