declare class BattleRoyal {
  $view: JQuery<HTMLElement>
  $playerList: JQuery<HTMLElement>
  $playerListContainer: JQuery<HTMLElement>
  $brMapContainer: JQuery<HTMLElement>
  $brMap: JQuery<HTMLElement>
  $loadTextContainer: JQuery<HTMLElement>
  PLAYER_LIST_ENTRY_TEMPLATE: string
  LEVEL_OVERLAP_HEIGHT: number
  inView: boolean
  _readyListener: Listener
  _spawnListener: Listener
  _objectDespawnListener: Listener
  _newEntryCollectedListener: Listener
  _dataStoreContentListener: Listener
  _dataStoreContentDespawn: Listener
  _spawnPlayerListener: Listener
  _newPlayerPositionListener: Listener
  _playerDespawnListener: Listener
  _playerLeaveListner: Listener
  _playerRejoiningListener: Listener
  _phaseOverListener: Listener
  _correctPosistionListener: Listener
  _spectatorCountChangeListener: Listener
  _returnMapListener: Listener
  _dropNameEntryListener: Listener
  _objectSpawnListener: Listener
  _nameChangeListner: Listener
  _noPlayersListner: Listener
  setup(): void
  timer: BattleRoyalTimer
  map: BattleRoyalMap
  collectionController: BattleRoyalCollectionController
  spectatorController: BattleRoyalSpectatorController
  setupGame(
    players: any,
    isSpectator: any,
    settings: any,
    timeLeft: any,
    mapState: any,
    soloMode: any,
    playerBRState: any
  ): void
  soloMode: any
  isSpectator: any
  settings: any
  players: {}
  closeView(args: any): void
  openView(callback: any): void
  updateMapSize(): void
  leave(): void
}
declare var battleRoyal: BattleRoyal
