import { forwardRef, Module } from '@nestjs/common';
import { ChatGatewayModule } from 'src/chat-gateway/chat-gateway.module';
import { SharedModule } from 'src/share/share.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
  imports: [
    SharedModule,
    forwardRef(() => ChatGatewayModule)
  ]
})
export class RoomsModule { }
