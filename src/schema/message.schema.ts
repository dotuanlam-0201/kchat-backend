import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({
  versionKey: false,
  timestamps: true
})
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId
  @Prop({ type: Types.ObjectId, ref: 'Room', required: true })
  roomId: Types.ObjectId
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