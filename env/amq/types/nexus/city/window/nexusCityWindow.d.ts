declare class NexusCityWindow {
  constructor($window: any)
  $window: any
  $exitButton: any
  $backButton: any
  get isOpen(): any
  trigger(): void
  open(): void
  close(): void
  executeClose(): void
  changeTab(newTab: any, noChangeHighlightTab: any): void
  executeTabChange(newTab: any, noChangeHighlightTab: any): void
  currentTab: any
  enableBackForTab(callback: any): void
  backClickCallback: any
}
