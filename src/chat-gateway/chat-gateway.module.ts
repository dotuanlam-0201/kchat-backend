import { Module } from '@nestjs/common';
import { ChatGatewayService } from './chat-gateway.service';
import { ChatGatewayGateway } from './chat-gateway.gateway';

@Module({
  providers: [ChatGatewayGateway, ChatGatewayService],
})
export class ChatGatewayModule {}
