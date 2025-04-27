import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Get('/:roomId')
  @ApiParam({
    name: 'roomId'
  })
  getMessages(@Param() param: Record<string, string>) {
    return this.messagesService.getMessages(param.roomId)
  }
}
