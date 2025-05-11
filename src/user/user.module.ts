import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGatewayModule } from 'src/chat-gateway/chat-gateway.module';
import { User, UserSchema } from 'src/schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [MongooseModule.forFeature([{
    name: User.name,
    schema: UserSchema
  }]), forwardRef(() => ChatGatewayModule)
  ]
})
export class UserModule { }
