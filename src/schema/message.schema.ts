import { Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  versionKey: false
})
export class Message {

}
export const MessageSchema = SchemaFactory.createForClass(Message)