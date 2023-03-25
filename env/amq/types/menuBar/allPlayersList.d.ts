declare function AllPlayersList(): void
declare class AllPlayersList {
  _$CONTAINER: JQuery<HTMLElement>
  _$LOADING_ICON: JQuery<HTMLElement>
  _$TAB: JQuery<HTMLElement>
  _$ONLINE_PLAYER_COUNT: JQuery<HTMLElement>
  _ALL_PLAYER_ENTRY_TEMAPLTE: string
  _playerEntries: {}
  TRACKING_TIMEOUT: number
  allOnlineUsersListnerActive: boolean
  ready: boolean
  _onlineUserChangeMessageListener: Listener
  _nameChangeListener: Listener
  _onlineCountChange: Listener
  startTracking(): void
  _onlinePlayers: {}
  stopTracking(): void
  trackingTimeout: NodeJS.Timeout
  show(): void
  hide(): void
  insertPlayer(name: any): JQuery<any>
  getEntryAfterPlayer(name: any): undefined
  compareNames(nameA: any, nameB: any): any
  loadAllOnline(): void
  createEntry(name: any): JQuery<any>
  attachContextMenu($entry: any, name: any): void
}
