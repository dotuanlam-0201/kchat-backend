import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class MessageDTO {
  @ApiProperty({
    description: 'User ID of the author',
    example: '',
    required: true
  })
  @IsMongoId()
  author: string;

  @ApiProperty({
    description: 'Room ID where the message belongs',
    example: '',
    required: true
  })
  @IsMongoId()
  roomId: string;

  @ApiPropertyOptional({
    description: 'Text content of the message',
    example: 'Hello world!'
  })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiPropertyOptional({
    description: 'URL to an attached file',
    example: ''
  })
  @IsString()
  @IsOptional()
  fileURL?: string;

  @ApiPropertyOptional({
    description: 'URL to an attached image',
    example: ''
  })
  @IsString()
  @IsOptional()
  imgURL?: string;

  @ApiPropertyOptional({
    description: 'Array of emotion reactions to the message',
    example: []
  })
  @IsArray()
  @IsOptional()
  reactions?: string[];
}