declare function ChatBar(): void
declare class ChatBar {
  activeChatContainerDom: JQuery<HTMLElement>
  _$ACTIVE_CHAT_SCROLL_CONTAINER: JQuery<HTMLElement>
  $LEFT_INDICATOR: JQuery<HTMLElement>
  $RIGHT_INDICATOR: JQuery<HTMLElement>
  SCROLL_CONTAINER_PADDING: number
  AUTO_SCROLL_INTERVAL_SIZE: number
  AUTO_SCROLL_TICK_RATE: number
  activeChats: any[]
  _newFriendRequestListner: Listener
  _gameInviteListner: Listener
  _nexusGameInviteListner: Listener
  _newChatAlertListener: Listener
  _chatMessageListener: Listener
  _serverMessageListener: Listener
  handleAlert(name: any, message: any, callback: any): void
  handleMessage(name: any, message: any, emojis: any, modMessage: any): void
  handleServerMessage(message: any): void
  handleActiveGameOnJoin(): boolean
  getChat(playerName: any, modMessage: any): any
  getChatInfo(owner: any): {
    chatObject: any
    index: number
  }
  updateLayout(): void
  getInsideOffsets(): {
    right: number
    left: number
  }
  toggleIndicators(): void
  closeOutsideChats(): void
  startChat(name: any): void
  scrollToChat(chat: any): void
  scrollingChat: any
  scrollRight(scrollingLeft: any): void
  scrollTimeout: NodeJS.Timeout
  scrollLeft(scrollingLeft: any): void
  clearScroll(): void
  deleteChat(owner: any): void
  shiftChatRight(chatName: any): void
  shiftChatLeft(chatName: any): void
}
declare const CHAT_BOX_WIDTH: 165
declare const CHAT_BASE_OFFSET: -15
