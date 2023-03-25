declare class ToggleButton {
  constructor($button: any, $text: any, onText: any, offText: any, callback?: () => void)
  $button: any
  $text: any
  onText: any
  offText: any
  _active: boolean
  set active(arg: boolean)
  get active(): boolean
  set disabled(arg: any)
}
