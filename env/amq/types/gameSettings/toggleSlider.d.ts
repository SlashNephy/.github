declare function ToggleSlider($container: any, tickNames: any): void
declare class ToggleSlider {
  constructor($container: any, tickNames: any)
  $container: any
  tickList: any[]
  setValue(onArray: any): void
  getValues(): any[]
}
declare function ToggleTrack(widthPercent: any): void
declare class ToggleTrack {
  constructor(widthPercent: any)
  $track: JQuery<HTMLElement>
  ticks: any[]
  addTick(tick: any): void
  update(): void
}
declare function ToggleTick(name: any, on: any, tickOffsetPercent: any): void
declare class ToggleTick {
  constructor(name: any, on: any, tickOffsetPercent: any)
  name: any
  _listeners: any[]
  $tick: JQuery<HTMLElement>
  $label: JQuery<HTMLElement>
  toggle(on: any): void
  on: any
  addListener(listener: any): void
}
