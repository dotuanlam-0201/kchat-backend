import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatGatewayService {
  private messages = {
  } as {
    [key: string]: Array<string>
  }
  saveMessage(payload: { room: string, content: string }) {
    const { room, content } = payload
    if (!this.messages[room]) this.messages[room] = [content]
    return payload
  }
  getMessages(room: string) {
    return this.messages[room]
  }
}
