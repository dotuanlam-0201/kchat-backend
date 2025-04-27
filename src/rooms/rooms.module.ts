import { Module } from '@nestjs/common';
import { SharedModule } from 'src/share/share.module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
  imports: [
    SharedModule
  ]
})
export class RoomsModule { }
