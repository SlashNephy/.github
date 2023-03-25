declare class StoreTicketStoreController {
  constructor(saleInfo: any)
  $mainContainer: JQuery<HTMLElement>
  $contentContainer: JQuery<HTMLElement>
  entries: any[]
  hide(): void
  show(): void
  resize(): void
  ENTRY_VALUES: {
    price: number
    amount: number
    tokens: number
  }[]
}
declare class StoreTicketStoreEntry {
  constructor(amount: any, price: any, token: any, sale: any, saleInfo: any)
  $entry: JQuery<any>
  $buyContainer: JQuery<HTMLElement>
  $buyText: JQuery<HTMLElement>
  $saleUnlocksLeft: JQuery<HTMLElement>
  $saleDaysLeft: JQuery<HTMLElement>
  saleUnlockListener: Listener
  updateSaleUnlockLeft(amount: any): void
  resize(): void
  TEMPLATE: string
}
