declare class StoreMainContainer {
  constructor($window: any)
  $noSelectionContainer: any
  $mainContainer: any
  $ticketContainer: any
  mainScrollListeners: any[]
  contentChangeListeners: any[]
  _$activeContainer: any
  set $activeContainer(arg: any)
  get $activeContainer(): any
  displayContent(contentList: any): void
  appendMainContent(content: any): void
  displayTickets(): void
  clearSelection(): void
  addMainScrollListener(callback: any): void
  addContentChangeListener(callback: any): void
  updateScroll(): void
  fireScrollEvent(event: any): void
  fireContentChangeEvent(): void
}
