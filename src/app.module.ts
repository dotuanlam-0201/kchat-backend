import { Module } from '@nestjs/common';
import { HealthModule } from 'src/heath/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGatewayModule } from './chat-gateway/chat-gateway.module';

@Module({
  imports: [HealthModule, ChatGatewayModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
