declare class StoreFilter {
  constructor($window: any)
  filters: {
    locked: StoreFilterEntry
    unlocked: StoreFilterEntry
    avaliable: StoreFilterEntry
    unavaliable: StoreFilterEntry
    limited: StoreFilterEntry
    unlimited: StoreFilterEntry
    premium: StoreFilterEntry
    standard: StoreFilterEntry
  }
  get currentFilter(): {}
}
declare class StoreFilterEntry {
  constructor($checkbox: any)
  $name: void
  $checkbox: any
  checked: boolean
}
