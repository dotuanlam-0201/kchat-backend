export enum SOCKET {
  joinRoom = 'joinRoom',
  leaveRoom = 'leaveRoom',
  getMessages = 'getMessages',
  sendMessage = 'sendMessage',
  roomCreated = 'roomCreated',
  deleteMessages = 'deleteMessages',
  messagesHistory = "messagesHistory",
  updateLastMessage = "updateLastMessage",
  updateLastMessageWithReaction = "updateLastMessageWithReaction",
  reactMessage = "reactMessage",
  onlineUsers = "onlineUsers",
}

export enum ROOM_TYPE {
  single = 'single',
  group = "group"
}

