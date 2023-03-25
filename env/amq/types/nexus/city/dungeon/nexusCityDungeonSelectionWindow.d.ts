declare class NexusCityDungeonSelectionWindow extends NexusCityWindow {
  currentSelectionTargetSlotNumber: any
  avatarInfoDisplay: NexusCityAvatarInfoDisplay
  modeSelectionTab: NexusDungeonSelectionTab
  dungeonSetupTab: NexusCityDungeonSetupTab
  avatarSelectionTab: NexusCityDungeonAvatarSelector
  teamSelectionTab: NexusCityDungeonTeamSelectTab
  badgeSelectionTab: NexusCityBadgeSelector
  activeLobby: boolean
  _joinNexusLobbyListener: Listener
  _nexusLobbyAvatarChangeListener: Listener
  _nexusLobbyBadgeChangeListener: Listener
  _unlockAvatarListener: Listener
  _leaveDungeonLobbyListener: Listener
  _nexusDungeonFinishedListener: Listener
  _exitNexusGame: Listener
  _nexusDungeonWindowInfoListener: Listener
  _nexusUpdateLobbyPlayerSlotsListener: Listener
  setupDungeonInfo({
    lobbyId,
    slotsInfo,
    avatarInfoList,
    teams,
    players,
    hostName,
    settings,
    badges,
  }: {
    lobbyId: any
    slotsInfo: any
    avatarInfoList: any
    teams: any
    players: any
    hostName: any
    settings: any
    badges: any
  }): void
  setupDungeonLobby(typeId: any, coop: any): void
  changeToConfigView(type: any): void
  changeToTeamSelectionView(): void
  displayAvatarSelection(targetSlotNumber: any, displayClear: any): void
  displayBadgeSelection(targetSlotNumber: any, displayClear: any): void
  selectAvatar(avatarId: any): void
  selectBadge(avatarId: any): void
  clearSelectedSlot(): void
  clearSelectedSlotsBadge(): void
  leaveLobby(): void
  changeTab(newTab: any): void
  DUNGEON_TYPE_IDS: {
    STANDARD: number
    ENDLESS: number
  }
}
declare class NexusCityDungeonAvatarEntry extends NexusCityAvatarEntry {
  constructor(avatarDescription: any, $container: any, hoverCallback: any, clickCallback: any)
  $freeWeekIcon: JQuery<HTMLElement>
  freeWeek: any
  updateFreeWeek(freeWeek: any): void
  set locked(arg: boolean)
  get locked(): boolean
  _locked: any
}
declare class NexusCityDungeonAvatarSelector extends NexusCityAvatarSelector {
  constructor(window: any)
  updateRotationAvatars(rotationAvatarIds: any): void
}
