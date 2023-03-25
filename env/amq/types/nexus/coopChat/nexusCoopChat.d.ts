declare class NexusCoopChat extends DragWindow {
  constructor()
  $chatContainer: any
  $chatMessageContainer: any
  $chatInput: any
  $playerContainer: any
  $playerCount: any
  $chatTab: any
  $playerTab: any
  chatMesageList: any[]
  playerMap: {}
  hostName: any
  _nexusCoopChatMessageListener: Listener
  _nexusCoopServerMessageListener: Listener
  _newNexusPlayerListener: Listener
  _nexusPlayerLeaveListener: Listener
  _nexusLobbyHostChangeListener: Listener
  _nexusPlayerDisconectListener: Listener
  _nexusPlayerReconectListener: Listener
  resetDrag(): void
  setGameMode(): void
  setNexusMode(): void
  clearGameMode(): void
  clearNexusMode(): void
  displayChat(): void
  displayPlayers(): void
  setupPlayers(playerList: any, hostName: any): void
  updateHostOptions(hostName: any): void
  addPlayer(playerInfo: any): void
  updatePlayerCount(): void
  displayMessage({ sender, message, emojis, badges }: { sender: any; message: any; emojis: any; badges: any }): void
  displayServerMessage({ message }: { message: any }): void
  insertMsg($meesage: any): void
  reset(): void
  CHAT_MESSAGE_TEMPLATE: string
  SERVER_MESSAGE_TEMPLATE: string
  BADGE_TEMPLATE: string
  MAX_CHAT_MESSAGES: number
}
declare var nexusCoopChat: NexusCoopChat
