declare class Switch {
  constructor($switch: any)
  $switch: any
  _on: boolean
  _listeners: any[]
  get on(): boolean
  setOn(on: any): void
  setDisabled(disabled: any): void
  addListener(listener: any): void
  addContainerToggle($onContainer: any, $offContainer: any): void
  getOn(): boolean
}
