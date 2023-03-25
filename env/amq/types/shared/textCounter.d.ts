declare class TextCounter {
  constructor($textContainer: any, speedMs: any, tickCallback: any, defaultValue?: number, finishedCallback?: any)
  $textContainer: any
  set currentValue(arg: any)
  get currentValue(): any
  targetValue: number
  speedMs: any
  tickCallback: any
  finishedCallback: any
  _currentValue: any
  get finished(): boolean
  countToValue(value: any): void
  currentInterval: any
  TICK_SPEED: number
}
