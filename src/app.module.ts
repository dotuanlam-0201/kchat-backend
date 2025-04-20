import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from 'src/heath/health.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatGatewayModule } from './chat-gateway/chat-gateway.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ChatGatewayModule,
    UserModule,
    AuthModule,
    HealthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONG_DB_URI', ''), // fallback empty string if undefined
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
