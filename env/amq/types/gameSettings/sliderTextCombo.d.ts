declare function SliderTextCombo($slider: any, textfields: any, sliderSettings: any): void
declare class SliderTextCombo {
  constructor($slider: any, textfields: any, sliderSettings: any)
  max: any
  min: any
  $slider: any
  textfields: any[]
  _listener: any[]
  addValueGroup(groupMembers: any): void
  getValue(): any
  setValue(newValue: any, fireChangeEvent: any): void
  relayout(): void
  addListener(listener: any): void
  setMax(newMax: any): void
  setDisabled(disabled: any): void
  isEnabled(): any
}
