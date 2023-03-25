declare function TimerBar($bar: any): void
declare class TimerBar {
  constructor($bar: any)
  $TIMER_BAR: any
  TICK_RATE: number
  setWidthPercent(percent: any): void
  start(timerLength: any, timeAlreadyPlayed: any): void
  updateInterval: any
  reset(): void
  updateState(state: any): void
}
