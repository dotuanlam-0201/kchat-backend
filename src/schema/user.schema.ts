import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  toJSON: {
    transform: function (doc, ret, opt) {
      delete ret['password']
      return ret
    }
  }
})
export class User {
  @Prop({ required: true, unique: true })
  email: string
  @Prop({ required: true })
  password: string
  @Prop()
  avatarURL: string
  @Prop()
  displayName: string
  @Prop()
  phoneNumber: string
}
export const UserSchema = SchemaFactory.createForClass(User)
