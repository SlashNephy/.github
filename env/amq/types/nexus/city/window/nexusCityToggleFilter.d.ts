declare class NexusCityToggleFilter {
  constructor($toggle: any, $container: any, filterCategories: any)
  $toggle: any
  $container: any
  filterCategories: any
  displayed: boolean
  closeHandler: () => void
  updateActive(): void
  checkFilter(entry: any): boolean
  open(): void
  close(): void
}
declare class NexusCityToggleFilterCategory {
  constructor(targetParameters: any, filterEntries: any)
  targetParameters: any
  filterEntries: any
  get activeFilter(): any
  checkFilter(entry: any): any
}
declare class NexusCityToggleFilterCategoryEntry {
  constructor($toggle: any, value: any, changeCallback: any)
  $toggle: any
  $box: any
  value: any
  on: boolean
  enable(): void
  disable(): void
}
