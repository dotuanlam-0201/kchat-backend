import { forwardRef, Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { SharedModule } from 'src/share/share.module';
import { UserModule } from 'src/user/user.module';
import { ChatGatewayGateway } from './chat-gateway.gateway';
import { ChatGatewayService } from './chat-gateway.service';

@Module({
  providers: [ChatGatewayGateway, ChatGatewayService],
  imports: [SharedModule, MessagesModule, RoomsModule,
    forwardRef(() => UserModule)
  ],
  exports: [ChatGatewayService],
})
export class ChatGatewayModule { }
