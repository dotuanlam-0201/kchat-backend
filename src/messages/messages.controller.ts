import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { QueryParameterBag } from './../../node_modules/@smithy/types/dist-types/http.d';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Get('/:roomId')
  @ApiParam({
    name: 'roomId'
  })
  getMessages(@Param() param: Record<string, string>, @Query() query: QueryParameterBag) {
    return this.messagesService.getMessages(query, param.roomId)
  }
}
