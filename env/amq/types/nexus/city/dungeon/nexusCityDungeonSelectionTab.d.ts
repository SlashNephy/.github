declare class NexusDungeonSelectionTab extends NexusCityWindowTab {
  constructor(window: any)
  $standardContainer: any
  standardModeSelectionEntry: NexusDungeonModeSelectionEntry
  _nexusClearSoloStateListener: Listener
  show(): void
  updateState(nexusStandardSoloGotState: any): void
  DUNGEON_TYPE_IDS: {
    STANDARD: number
    ENDLESS: number
  }
}
declare class NexusDungeonModeSelectionEntry {
  constructor($container: any, typeId: any)
  $container: any
  $soloButton: any
  $coopButton: any
  $coopHostButton: any
  $coopJoinButton: any
  $coopBackButton: any
  soloContinueText: any
  typeId: any
  toggleSoloContinue(toggleOn: any): void
  initDungeonLobby(typeId: any, coop: any): void
  reset(): void
  LOBBY_ID_MAX_LENGTH: number
  LOBBY_ID_MIN_LENGTH: number
}
