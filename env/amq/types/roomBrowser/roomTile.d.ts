declare function RoomTile(
  settings: any,
  host: any,
  hostAvatar: any,
  id: any,
  numberOfPlayers: any,
  numberOfSpectators: any,
  players: any,
  inLobby: any,
  parent: any,
  songLeft: any,
  tutorialRoom: any,
  $scrollContainer: any
): void
declare class RoomTile {
  constructor(
    settings: any,
    host: any,
    hostAvatar: any,
    id: any,
    numberOfPlayers: any,
    numberOfSpectators: any,
    players: any,
    inLobby: any,
    parent: any,
    songLeft: any,
    tutorialRoom: any,
    $scrollContainer: any
  )
  settings: any
  id: any
  host: any
  _inLobby: any
  _roomSize: any
  _numberOfPlayers: any
  _numberOfSpectators: any
  _players: any
  _private: any
  modalPreviewOpen: boolean
  _friendsInGameMap: {}
  parent: any
  $tile: JQuery<HTMLElement>
  $joinButton: JQuery<HTMLElement>
  _changeListner: Listener
  avatarPreloadImage: PreloadImage
  joinGame(): void
  spectateGame(): void
  togglePrivate(): void
  isPrivate(): any
  translateSongSelection(songSelection: any): 'Random' | 'Mainly Watched' | 'Only Watched' | 'Custom'
  translateGuessTime(guessTimeEntry: any): string
  updateFriendInfo(): void
  updateSetting(setting: any, change: any): void
  updateAdvancedSetting(className: any, newValue: any): void
  updateAdvancedSelection(className: any, selected: any): void
  updateSelection(className: any, selected: any): void
  updateProgressBar(): void
  toggleJoinButton(): void
  isInLobby(): any
  isFull(): boolean
  getSelectionClass(checked: any): '' | 'rbrSelected'
  delete(): void
  setHidden(hide: any): void
  updateFriends(): void
  resizeRoomName(): void
  setSongsLeft(newValue: any): void
  previewSettings(): void
  settingPreviewClosed(): void
  getFriendsInGame(): string[]
  AVATAR_SIZE_MOD_SIZES: {
    0: string
    20: string
    51: string
  }
}
declare var ROOM_TILE_TEMPLATE: string
