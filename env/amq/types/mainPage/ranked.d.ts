declare class Ranked {
  $button: JQuery<HTMLElement>
  $buttonStateMessage: JQuery<HTMLElement>
  $buttonStatusText: JQuery<HTMLElement>
  $buttonRankedTimer: JQuery<HTMLElement>
  $buttonTimerSerie: JQuery<HTMLElement>
  $buttonTimer: JQuery<HTMLElement>
  $descriptionButton: JQuery<HTMLElement>
  $descriptionModal: JQuery<HTMLElement>
  timers: {}
  currentState: any
  $modeSelector: JQuery<HTMLElement>
  $noviceSelector: JQuery<HTMLElement>
  $expertSelector: JQuery<HTMLElement>
  _stateChangeListener: Listener
  setup({ state, serieId, games }: { state: any; serieId: any; games: any }): void
  updateState(state: any, serieId: any, games: any): void
  joinRankedLobby(rankedTypeId: any): void
  joinRankedGame(rankedTypeId: any): void
  showNextTimer(): void
  currentTimerId: any
  showTimer(targetId: any): void
  getCurrentTargetTime(): any
  GAME_HOST_TIME_OBJECT: {
    hours: number
    minutes: number
    seconds: number
  }
  GAME_TIME_ZONES: {
    1: string
    2: string
    3: string
  }
  GAME_SERIES_IDS: {
    CENTRAL: number
    WEST: number
    East: number
  }
  GAME_SERIES_SYMBOL: {
    1: string
    2: string
    3: string
  }
  GAME_SERIES_NAMES: {
    1: string
    2: string
    3: string
  }
  STATE_MESSAGES: {
    0: string
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
    7: string
    8: string
  }
  RANKED_STATE_IDS: {
    OFFLINE: number
    LOBBY: number
    RUNNING: number
    FINISHED: number
    CHAMP_OFFLINE: number
    CHAMP_LOBBY: number
    CHAMP_RUNNING: number
    CHAMP_FINISHED: number
    BREAK_DAY: number
  }
  RANKED_TYPE_IDS: {
    NOVICE: number
    EXPERT: number
  }
}
declare class RankedTimer {
  constructor($timer: any, $message: any, targetTimeObject: any, timeZone: any, serieSymbol: any)
  $timer: any
  $message: any
  targetTimeObject: any
  timeZone: any
  serieSymbol: any
  breakMode: boolean
  get targetTime(): any
  _targetTime: any
  get timeLeft(): any
  getTimeLeftString(): string
  zeroMode(): void
  show(): void
  start(): void
  interval: NodeJS.Timer
  stop(): void
  updateTimer(): void
  calculateDurationLeft(): any
  UPDATE_INTERVAL: number
}
declare var ranked: Ranked
