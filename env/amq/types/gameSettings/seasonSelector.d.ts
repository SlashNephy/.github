declare function SeasonSelector($seasonContainer: any): void
declare class SeasonSelector {
  constructor($seasonContainer: any)
  seasonObjects: any
  _listeners: any[]
  setValue(seasonNumber: any): void
  getValue(): undefined
  addListener(listener: any): void
}
