declare class StoreTickets {
  constructor(mainContanier: any, recentTicketRewards: any, rollTargets: any, saleInfo: any)
  $ticketOptionContainer: JQuery<HTMLElement>
  $useButton: JQuery<HTMLElement>
  $buyButton: JQuery<HTMLElement>
  $historyButton: JQuery<HTMLElement>
  $infoTabMain: JQuery<HTMLElement>
  _topIcon: StoreTopIcon
  historySelector: StoreTicketHistory
  rollSelector: StoreTicketRollSelector
  storeSelector: StoreTicketStoreController
  handleDisplayed(): void
  changeToBuy(): void
  get $topIcon(): JQuery<any>
  resize(): void
  TOP_ICON_NAME: string
}
