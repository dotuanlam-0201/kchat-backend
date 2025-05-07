import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
@Schema({
  timestamps: true,
  versionKey: false
})
export class MessageReaction {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author: Types.ObjectId
  @Prop({ required: true })
  react: string
}

export const MessageReactionSchema = SchemaFactory.createForClass(MessageReaction)