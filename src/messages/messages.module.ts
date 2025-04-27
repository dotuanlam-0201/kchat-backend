import { Module } from '@nestjs/common';
import { SharedModule } from 'src/share/share.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [
    SharedModule
  ],
  exports: [MessagesService]
})
export class MessagesModule { }
