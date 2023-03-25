declare class QusetContainer {
  $body: JQuery<HTMLElement>
  $questContainer: JQuery<HTMLElement>
  $infoIcon: JQuery<HTMLElement>
  $stickOut: JQuery<HTMLElement>
  $counterCurrent: JQuery<HTMLElement>
  $counterTarget: JQuery<HTMLElement>
  $tokenCounter: JQuery<HTMLElement>
  $tokenGainedShadow: JQuery<HTMLElement>
  questMap: {}
  questEventListener: Listener
  set tokenProgress(arg: any)
  setup(questDescriptions: any, tokenProgress: any): void
  selectQuest(weekSlot: any): void
  selectedQuest: any
  updateCounter(): void
  QUEST_EVENTS: {
    STATE_UPDATE: number
  }
}
declare var qusetContainer: QusetContainer
declare class Quest {
  constructor(questDescription: any, locked: any)
  $body: JQuery<HTMLElement>
  $progressBar: JQuery<HTMLElement>
  $name: JQuery<HTMLElement>
  $stateCount: JQuery<HTMLElement>
  $totalStateCount: JQuery<HTMLElement>
  $questTypeText: JQuery<HTMLElement>
  locked: any
  get sortValue(): any
  get popoverContent(): string
  set selected(arg: any)
  get typeName(): 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Eve' | 'unk'
  get timeUntilReset(): any
  updateState(state: any): void
  eventQuest: boolean
  questId: any
  name: any
  state: any
  targetState: any
  ticketReward: any
  noteReward: any
  description: any
  weekSlot: any
  updateBody(): void
  updateProgressBar(): void
  TEMPALTE: string
}
