declare class NexusCityFilter {
  constructor(
    filterEntries: any,
    defaultSortFunction: any,
    $nameSearch: any,
    callbackFunction: any,
    initialSortFunction: any,
    toggleFilter: any
  )
  filterEntries: any
  defaultSortFunction: any
  initialSortFunction: any
  $nameSearch: any
  toggleFilter: any
  searchString: any
  reset(): void
  sortList(list: any): any
  TEXT_INPUT_UPDATE_DELAY: number
}
