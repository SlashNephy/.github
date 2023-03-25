declare class StorePriceModal {
  $modal: JQuery<HTMLElement>
  $itemList: JQuery<HTMLElement>
  $totalList: JQuery<HTMLElement>
  $buyButton: JQuery<HTMLElement>
  $buySpinner: JQuery<HTMLElement>
  $clickBlocker: JQuery<HTMLElement>
  $closeButton: JQuery<HTMLElement>
  $paypalButton: JQuery<HTMLElement>
  $patreonButton: JQuery<HTMLElement>
  $payOptions: JQuery<HTMLElement>
  showAvatar(priceItems: any, avatarId: any, colorId: any): void
  paypalType: string
  paypalPackage:
    | {
        avatarId: any
        colorId: any
        ticketAmount?: undefined
        price?: undefined
      }
    | {
        ticketAmount: any
        price: any
        avatarId?: undefined
        colorId?: undefined
      }
  showEmote(priceItems: any, emoteId: any): void
  showTicket(priceItems: any, ticketAmount: any, price: any, taxPrice: any): void
  itemsHaveRealMoneyPrice(priceItems: any): any
  displayPriceItems(priceItems: any, buyCallback: any, taxPrice: any): void
  currentNotePrice: number
  currentRhythmPrice: number
  transactionComplete(message?: string): void
  transactionFailed(error: any): void
  hide(): void
  startTransaction(): void
  transactionTimeout: NodeJS.Timeout
  enableClose(): void
  disableClose(): void
  ITEM_TEMPLATE: string
  TRANSACTION_TIMEOUT_TIME: number
  PAYPAL_TYPES: {
    AVATAR: string
    TICKETS: string
  }
}
declare let storePriceModal: StorePriceModal
