declare class LobbyRuleModal {
  $modal: JQuery<HTMLElement>
  $prevButton: JQuery<HTMLElement>
  $nextButton: JQuery<HTMLElement>
  $imageContainer: JQuery<HTMLElement>
  $title: JQuery<HTMLElement>
  mainCycle: LobbyRuleCycleContainer
  modeCycle: LobbyRuleCycleContainer
  currentSetIndex: number
  entries: any[]
  teamModeSet: LobbyRuleModalEntrySet
  speedScoringSet: LobbyRuleModalEntrySet
  livesSet: LobbyRuleModalEntrySet
  lootingSet: LobbyRuleModalEntrySet
  get onLastEntry(): boolean
  get onFirstEntry(): boolean
  show(): void
  hide(): void
  reset(): void
  setupContent(showLooting: any, showTeam: any, showSpeed: any, showLives: any): void
  setActiveSet(index: any): void
  selectedChange(newIndex: any): void
  updateButtons(): void
  TEAM_MODE_TEMPLATE: string
  SPEED_SCORING_TEMPLATE: string
  LIVES_TEMPLATE: string
  LOOTING_TEMPLATE: string
}
declare class LobbyRuleCycleContainer {
  constructor($container: any)
  $container: any
  entries: any[]
  activeIndex: number
  setup(amount: any, nameMap: any, activeIndex: any, onClickHandler?: () => void): void
  setActive(index: any): void
  ENTRY_TEMPLATE: string
}
declare class LobbyRuleModalEntrySet {
  constructor(
    name: any,
    $entries: any,
    maxSizeMap: any,
    customOffsetMap: any,
    mainController: any,
    nameMap: any,
    onFinishCallback: any
  )
  name: any
  entries: LobbyRuleModalEntry[]
  selectedEntryIndex: number
  mainController: any
  nameMap: any
  onFinishCallback: any
  get entryCount(): number
  get onLastEntry(): boolean
  get onFirstEntry(): boolean
  removeEntries(): void
  reset(): void
  updateSelectedEntry(): void
  changeSelected(newIndex: any): void
  setNewSelected(newIndex: any): void
  FULL_WIDTH: number
  DEFAULT_OPEN_SIZE: number
}
declare class LobbyRuleModalEntry {
  constructor($entry: any, index: any, parentSet: any, maxSize: any, customOffset: any)
  $entry: any
  index: any
  parentSet: any
  maxSize: any
  _selected: boolean
  set width(arg: any)
  set selected(arg: boolean)
  get selected(): boolean
}
