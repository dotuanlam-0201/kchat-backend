import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Message } from "src/schema/message.schema";
import { User } from "src/schema/user.schema";
import { ROOM_TYPE } from "src/types/enum";

@Schema({
  versionKey: false,
  timestamps: true
})
export class Room {
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }], required: true })
  participants: Types.ObjectId[];
  @Prop({ type: Types.ObjectId, ref: Message.name, required: true })
  lastMessage: Types.ObjectId
  @Prop({ required: true })
  type: ROOM_TYPE
}

export const RoomSchema = SchemaFactory.createForClass(Room)