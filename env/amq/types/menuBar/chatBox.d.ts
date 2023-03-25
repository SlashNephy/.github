declare function ChatBox(name: any, parentBar: any, modMessage: any): void
declare class ChatBox {
  constructor(name: any, parentBar: any, modMessage: any)
  name: any
  id: string
  modMessage: any
  parentBar: any
  update: boolean
  moveing: boolean
  targetOnline: boolean
  dom: JQuery<any>
  footer: JQuery<HTMLElement>
  container: JQuery<HTMLElement>
  $CHAT_INPUT_TEXTAREA: JQuery<HTMLElement>
  $CHAT_INPUT: JQuery<HTMLElement>
  $CHAT_CONTENT: JQuery<HTMLElement>
  $HEADER: JQuery<HTMLElement>
  emoteSelectorWrapper: EmoteSelectorInputWrapper
  _playerOnlineChangeListener: Listener
  _messageResponseListner: Listener
  getXOffset(): number
  getOffset(): number
  getFooterHeader(): JQuery<HTMLElement>
  setOffset(value: any): void
  selected(): void
  newUpdate(): void
  writeMessage(sender: any, msg: any, emojis: any, allowHtml: any): void
  delete(): void
  updateFooterFontSize(): void
  handleAlert(msg: any, callback: any): void
  handleMessage(sender: any, msg: any, emojis: any, allowHtml: any): void
  handleOnline(): void
  handleOffline(): void
  setServerMessage(): void
  openClose(): void
  closeHeader(): void
  scrollChatInView(): void
  close(): void
  open(): void
}
declare function createFriendRequestHandler(accept: any, callback: any): any
declare var chatBoxTemplate: string
declare var chatHeaderInputTemplate: string
declare var chatBoxLineTemplate: string
declare var chatHeaderCloseTemplate: string
declare var CHAT_CONTENT_SIZE: number
