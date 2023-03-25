declare class Tutorial {
  $container: JQuery<HTMLElement>
  $blockerLayer: JQuery<HTMLElement>
  $tutorialTileContainer: JQuery<HTMLElement>
  messageContainer: TutorialMessageContainer
  optionContainer: TutorialOptionController
  state: {}
  inToturialGame: boolean
  $modal: JQuery<HTMLElement>
  gameplayModalRow: TutorialModalRow
  avatarModalRow: TutorialModalRow
  socialModalRow: TutorialModalRow
  set showLooting(arg: boolean)
  get showLooting(): boolean
  set showTeams(arg: boolean)
  get showTeams(): boolean
  set showSpeed(arg: boolean)
  get showSpeed(): boolean
  set showLives(arg: boolean)
  get showLives(): boolean
  setup(tutorialState: any, roomInvite: any): void
  $tutorialRoomTile: JQuery<any>
  nexusCityOverviewRow: TutorialModalNexusRow
  nexusDungeonModeRow: TutorialModalNexusRow
  nexusDungeonLobbyRow: TutorialModalNexusRow
  nexusAvatarSelectionRow: TutorialModalNexusRow
  nexusDungeonMapRow: TutorialModalNexusRow
  nexusDungeonCombatRow: TutorialModalNexusRow
  nexusDungeonRewardsRow: TutorialModalNexusRow
  nexusCraftingStationRow: TutorialModalNexusRow
  nexusWorkshopRow: TutorialModalNexusRow
  nexusRuneSetupRow: TutorialModalNexusRow
  show(): void
  hide(): void
  updateNexusRowStates(): void
  nexusTutorialCompleted(tutorialId: any): void
  nexusTutorialReset(tutorialId: any): void
  createTutorialStates(): void
  TUTORIAL_STATES: {
    WELCOME: TutorialState[]
    WELCOME_NO_LIST: TutorialState[]
    WELCOME_NO_LIST_DISMISS: TutorialState[]
    WELCOME_DISMISS: TutorialState[]
    FIRST_GAME: TutorialState[]
    AVATAR: TutorialState[]
    SOCIAL: TutorialState[]
    DISSMISS: TutorialState[]
  }
  startFirstGameTutorial(): void
  startAvatarTutorial(): void
  startSocialTutorial(): void
  startTutorialAt(stateName: any, stateNumber: any): void
  displayState(stateName: any, stateNumber: any): void
  currentTutorialState: any
  updateModalRowStates(): void
  NOTE_REWARD_SIZE: number
}
declare class TutorialMessageContainer {
  constructor(tutorialController: any)
  $container: JQuery<HTMLElement>
  $exitButton: JQuery<HTMLElement>
  $continueButton: JQuery<HTMLElement>
  $titleText: JQuery<HTMLElement>
  $message: JQuery<HTMLElement>
  inExit: boolean
  set text(arg: any)
  set title(arg: any)
  hide(): void
  show(): void
  displayState({
    title,
    message,
    nextStateGroupName,
    nextStateNumber,
    options,
    $altTrigger,
    triggerEvents,
    hideTrigger,
    customTriggerSetup,
  }: {
    title: any
    message: any
    nextStateGroupName: any
    nextStateNumber: any
    options: any
    $altTrigger: any
    triggerEvents: any
    hideTrigger: any
    customTriggerSetup: any
  }): void
  nextStateGroup: any
  nextStateNumber: any
  hideTrigger: any
}
declare class TutorialState {
  constructor(
    tutorialController: any,
    title: any,
    message: any,
    nextStateGroupName: any,
    nextStateNumber: any,
    options: any,
    popoutElements: any,
    highlightElements: any,
    enableSoloElements: any,
    enableElements: any,
    disableElements: any,
    $altTrigger: any,
    triggerEvents: any,
    onClear: any,
    onDisplay: any,
    hideTrigger: any,
    altTargetInfo: any,
    onDisplayConfig: any,
    customTriggerSetup: any
  )
  title: any
  message: any
  _nextStateGroupName: any
  _nextStateNumber: any
  options: any
  popoutElements: any
  highlightElements: any
  enableSoloElements: any
  enableElements: any
  disableElements: any
  $altTrigger: any
  triggerEvents: any
  onClear: any
  onDisplay: any
  hideTrigger: any
  altTargetInfo: any
  onDisplayConfig: any
  customTriggerSetup: any
  controller: any
  msgContainer: any
  optionContainer: any
  get nextStateGroupName(): any
  get nextStateNumber(): any
  display(): void
  unbindTriggersFunction: any
  clearState(): void
}
declare class TutorialOptionController {
  $container: JQuery<HTMLElement>
  options: TutorialOption[]
  setupOptions(newOptions: any): void
}
declare class TutorialOption {
  constructor($container: any)
  $container: any
  $text: any
  set text(arg: any)
  displayOption({ text, callback }: { text: any; callback: any }): void
  callback: any
  updateTextSize(): void
  show(): void
  hide(): void
}
declare class TutorialModalRow {
  constructor($row: any, buttonEvent: any)
  $row: any
  $button: any
  $text: any
  setPending(): void
  setCompleted(): void
  setDisabled(): void
}
declare class TutorialModalNexusRow extends TutorialModalRow {}
declare var tutorial: Tutorial
