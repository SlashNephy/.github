declare function RoomBrowser(): void
declare class RoomBrowser {
  $view: JQuery<HTMLElement>
  $roomContainer: JQuery<HTMLElement>
  $roomHider: JQuery<HTMLElement>
  $totalRoomCount: JQuery<HTMLElement>
  $shownRoomCount: JQuery<HTMLElement>
  activeRooms: {}
  numberOfRooms: number
  _roomListner: Listener
  setup(): void
  closeView(): void
  openView(callback: any): void
  openHostModal(): void
  host(): void
  hostListner: any
  appendRoomTile(tileHtml: any): void
  removeRoomTile(tileId: any): void
  updateNumberOfRoomsText(): void
  applyTileFilter(): void
  applyTileFilterToRoom(room: any): void
  notifyFriendChange(): void
  fireJoinLobby(gameId: any, password: any): void
  joinGameListner: any
  spectateGameWithPassword(gameId: any): void
  fireSpectateGame(gameId: any, password: any, gameInvite: any): void
  spectateGameListner: any
  joinLobby(data: any, isSpectator: any): void
  joinGame(data: any): void
}
declare var roomBrowser: RoomBrowser
