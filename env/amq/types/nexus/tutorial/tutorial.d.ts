declare class NexusTutorialController {
  window: NexusTutorialWindow
  startCityOverviewTutorial($cityContainer: any, elementMap: any, cityController: any): void
  startDungeonModeTutorial(selectionTab: any): void
  startDungeonLobbyTutorial($slot: any, $settingRow: any, $rating: any, $floor: any): void
  startDungeonAvatarSelectionTutorial(avatarSelector: any): void
  startDungeonMapTutorial($partyContainer: any, $runeContainer: any): void
  startDungeonCombatTutorial($enemyContainer: any, $turnOrder: any, $partyContainer: any): void
  startDungeonRewardsTutorial($fragments: any, $artifactRow: any, $runeRow: any, $continueButton: any): void
  startDungeonCraftingStationTutorial($continueButton: any): void
  startWorkshopTutorial($reformaterTab: any): void
  startRuneSetupTutorial(
    $runeContainer: any,
    $slotContainer: any,
    $minorRuneContainer: any,
    $minorRuneContainerTwo: any,
    $sharedRuneSlot: any,
    $slotCounter: any,
    $saveButton: any,
    $clearButton: any,
    $runePageContainer: any
  ): void
  NEXUS_TUTORIAL_IDS: {
    CITY_OVERVIEW: number
    DUNGEON_MODE: number
    DUNGEON_LOBBY: number
    DUNGEON_AVATAR_SELECTION: number
    DUNGEON_MAP: number
    DUNGEON_COMBAT: number
    DUNGEON_REWARDS: number
    CRAFTING_STATION: number
    WORKSHOP: number
    RUNE_SETUP: number
  }
}
declare class BaseNexusTutorial {
  constructor(tutorialId: any)
  tutorialId: any
  events: any[]
  currentIndex: number
  addEvent(
    text: any,
    element: any,
    centerPosition: any,
    triggerHandler: any,
    delay: any,
    centerOffsetX: any,
    centerOffsetY: any
  ): void
  get currenEventInfo(): any
  start(): any
  step(): any
}
declare class NexusTutorialWindow {
  $body: JQuery<HTMLElement>
  $text: JQuery<HTMLElement>
  $backdrop: JQuery<HTMLElement>
  currentTutorial: any
  doingDelay: boolean
  loadTutorial(tutorial: any): void
  handleClick(): void
  handleNewContent({
    text,
    element,
    centerPosition,
    triggerHandler,
    delay,
    centerOffsetX,
    centerOffsetY,
  }: {
    text: any
    element: any
    centerPosition: any
    triggerHandler: any
    delay: any
    centerOffsetX: any
    centerOffsetY: any
  }): void
  showContent({
    text,
    element,
    centerPosition,
    centerOffsetX,
    centerOffsetY,
  }: {
    text: any
    element: any
    centerPosition: any
    centerOffsetX: any
    centerOffsetY: any
  }): void
  hide(): void
}
declare class NexusTutorialBasePositionElement {
  constructor(
    element: any,
    vertPosition: any,
    horPosition: any,
    noOffsetbackdrop: any,
    backdropOffsetX: any,
    backdropOffsetY: any,
    extraOffsetX: any,
    extraOffsetY: any
  )
  element: any
  vertPosition: any
  horPosition: any
  noOffsetbackdrop: any
  backdropOffsetX: any
  backdropOffsetY: any
  extraOffsetX: any
  extraOffsetY: any
  get elementCords(): void
  get elementHeight(): void
  get elementWidth(): void
  calculatePosition(): {
    xCord: any
    yCord: any
    backdropXOffset: number
    backdropYOffset: number
  }
  TUTORIAL_WINDOW_HEIGHT: number
  TUTORIAL_WINDOW_WIDTH: number
}
declare class NexusTutorialStandardPositionElement extends NexusTutorialBasePositionElement {
  get elementCords(): {
    yCord: any
    xCord: any
  }
  get elementHeight(): any
  get elementWidth(): any
}
declare var nexusTutorialController: NexusTutorialController
