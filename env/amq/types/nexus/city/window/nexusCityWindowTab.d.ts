declare class NexusCityWindowTab {
  constructor(window: any, $leftContainer: any, $rightContainer: any, $tab: any)
  window: any
  $leftContainer: any
  $rightContainer: any
  $tab: any
  confirmTabChange(callback: any): void
  confirmClose(callback: any): void
  reset(): void
  show(noChangeHighlightTab: any): void
  hide(noChangeHighlightTab: any): void
}
