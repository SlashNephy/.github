declare class StoreTicketHistory {
  constructor(recentTicketRewards: any)
  $mainContainer: JQuery<HTMLElement>
  $innerContainer: JQuery<HTMLElement>
  $noRollsMessageContainer: JQuery<HTMLElement>
  historyEntries: any
  hide(): void
  show(): void
  addEntries(newEntries: any): void
  MAX_ELEMENTS: number
}
declare class StoreTicketHistoryEntry {
  constructor(
    {
      type,
      description,
      tier,
      rhythm,
    }: {
      type: any
      description: any
      tier: any
      rhythm: any
    },
    $container: any
  )
  loadTriggered: boolean
  $html: JQuery<any>
  imagePreload: PreloadImage
  display(): void
  updateTextSize(): void
  detatch(): void
  destroy(): void
  ENTRY_TEMPLATE: string
  TARGET_FONT_SIZE: number
  MIN_FONT_SIZE: number
}
