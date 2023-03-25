declare class NexusCityWorkshopRuneReformaterTab extends NexusCityWindowTab {
  constructor(window: any, runeSelector: any)
  $outerContainer: any
  slotHandler: NexusCityWorkshopRuneReformaterSlotHandler
  successContainer: NexusCityWorkshopRuneReformaterSuccessRateContainer
  duplicateButton: NexusCityWindowButton
  upgradeButton: NexusCityWindowButton
  runeSelector: any
  show(): void
  hide(): void
  slotInRune(slot: any): void
  unequipSlot(slot: any): void
  updateSuccessRate(): void
  MAX_LEVEL_FOR_UPGRADING: number
}
declare class NexusCityWorkshopRuneReformaterSlotHandler {
  constructor($container: any, controller: any)
  sacSlots: any[]
  mainSlot: NexusCityWorkshopRuneReformaterSlot
  get sacRuneInfo(): any[]
  get mainSlotRuneInfo(): {
    runeId: any
    level: any
  }
  get mainSlotInUse(): boolean
  unlockSacSlots(): void
  lockSacSlots(): void
  calculateSuccessRate(): number
  reset(): void
  BASE_CHANCE_PERCENT: number
}
declare class NexusCityWorkshopRuneReformaterSlot extends NexusCityWorkshopRuneSlot {
  constructor($body: any, imageSize: any, controller: any, mainSlot: any)
  mainSlot: any
  get runeInfo(): {
    runeId: any
    level: any
  }
  unlock(): void
  lock(): void
}
declare class NexusCityWorkshopRuneReformaterSuccessRateContainer {
  constructor($container: any)
  $successText: any
  setSuccessPercent(percent: any): void
  reset(): void
}
