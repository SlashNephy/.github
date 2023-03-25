declare function BattleRoyalCollectionController(): void
declare class BattleRoyalCollectionController {
  $container: JQuery<HTMLElement>
  $list: JQuery<HTMLElement>
  $slotsLeft: JQuery<HTMLElement>
  $collectedCount: JQuery<HTMLElement>
  size: number
  entries: any[]
  reset(): void
  hide(): void
  show(): void
  addEntry(entry: any): void
  removeEntry(id: any): void
  updateCounter(): void
  extractShowName(nameInfo: any): any
  setSize(size: any): void
  isFull(): boolean
  disableDrop(): void
  AMOUNT_FOR_WARNING_COLOR: number
}
