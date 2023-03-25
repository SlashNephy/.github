declare class NexusCityOrderFilter {
  constructor($triggerElement: any, useSortFunction: any, sortValueFunction: any, triggerCallback: any)
  useSortFunction: any
  sortValueFunction: any
  $triggerElement: any
  $directionElement: any
  set state(arg: any)
  get state(): any
  setOnStateChangeCallback(callback: any): void
  onStateChangeCallback: any
  shouldSort(a: any, b: any): any
  calculateSortValue(a: any, b: any): number
  reset(): void
  _state: any
  STATES: {
    ACTIVE: number
    REVERSE: number
    OFF: number
  }
}
