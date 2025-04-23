import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "src/schema/user.schema";

@Schema({
  versionKey: false,
  timestamps: true
})
export class Message {
  @Prop({ type: { type: Types.ObjectId, ref: User.name }, required: true })
  author: User
  @Prop()
  text?: string
  @Prop()
  fileURL?: string
  @Prop()
  imgURL?: string
  @Prop()
  emotions?: Array<string>
}
export const MessageSchema = SchemaFactory.createForClass(Message)