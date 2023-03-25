declare class NexusCityWorkshopRuneSetupTab extends NexusCityWindowTab {
  constructor(window: any, statBaseMax: any, runeSelector: any)
  $outerContainer: any
  $openSlotsCounter: any
  currentRuneSetup: any[]
  saveButton: NexusCityWindowButton
  unequipAllButton: NexusCityWindowButton
  emptyRuneSlotCount: number
  runeSelector: any
  avatarInfoDisplay: NexusCityAvatarInfoDisplay
  tooltip: NexusCityWorkshopRuneSetupTooltip
  slotHandler: NexusCityWorkshopRuneSelectorSlotHandler
  displayAvatar(avatarInfo: any): void
  avatarId: any
  setupRunes(runeInfo: any, noDisplayUpdate: any): void
  show(): void
  hide(): void
  slotInRune(slot: any): void
  unequipSlot(slot: any, skipOpenSlotUpdate: any): void
  updateOpenSlots(): void
  newRuneLayout(runes: any, emptyRuneSlotCount: any): void
  updateSaveButtonState(): void
  get pageChanged(): boolean
  TOOLTIPS: {
    NO_RUNE_SELECTED: string
    WRONG_RUNE_SLOT: string
    INVALID_SETUP: string
    DUPLICATE_ADVANCED_RUNE: string
  }
}
declare class NexusCityWorkshopRuneSelectorSlotHandler {
  constructor($window: any, controller: any, tooltip: any)
  offensiveStandardTopContainer: NexusCityWorkshopRuneSelectorStandardContainer
  offensiveStandardBottomContainer: NexusCityWorkshopRuneSelectorStandardContainer
  defensiveStandardTopContainer: NexusCityWorkshopRuneSelectorStandardContainer
  defensiveStandardBottomContainer: NexusCityWorkshopRuneSelectorStandardContainer
  offensiveAdvancedContainer: NexusCityWorkshopRuneSelectorAdvancedContainer
  defensiveAdvancedContainer: NexusCityWorkshopRuneSelectorAdvancedContainer
  sharedAdvancedContainer: NexusCityWorkshopRuneSelectorAdvancedContainer
  get allOffensiveContainers(): (
    | NexusCityWorkshopRuneSelectorStandardContainer
    | NexusCityWorkshopRuneSelectorAdvancedContainer
  )[]
  get allDefensiveContainers(): (
    | NexusCityWorkshopRuneSelectorStandardContainer
    | NexusCityWorkshopRuneSelectorAdvancedContainer
  )[]
  get allContainers(): (
    | NexusCityWorkshopRuneSelectorStandardContainer
    | NexusCityWorkshopRuneSelectorAdvancedContainer
  )[]
  get allRunes(): any[]
  get validSlotSetup(): boolean
  validateAdvancedRuneEquipSetup(newRuneId: any): boolean
  checkContainerSetupValid(topContainer: any, advancedContainer: any, bottomContainer: any): any
  displayRunes(runes: any): void
  updateLockedStates(): void
  updateLockStatesForContainers(topContainer: any, advancedContainer: any, bottomContainer: any): any
  updateOpenSlots(openSlots: any): void
  reset(): void
  OFFENSIVE_RUNE_TOP_RANGE: number[]
  OFFENSIVE_ADVANCED_SLOT_NUMBER: number
  OFFENSIVE_RUNE_BOTTOM_RANGE: number[]
  DEFENSIVE_RUNE_TOP_RANGE: number[]
  DEFENSIVE_ADVANCED_SLOT_NUMBER: number
  DEFENSIVE_RUNE_BOTTOM_RANGE: number[]
  SHARED_ADVANCED_SLOT_NUMBER: number
}
declare class NexusCityWorkshopRuneSelectorContainer {
  constructor($container: any, baseSlotNumber: any, controller: any, categoryList: any, tooltip: any)
  $container: any
  controller: any
  locked: boolean
  openSlots: boolean
  entryMap: {}
  get allSlotsInUse(): boolean
  get allRunes(): any[]
  get slotInUse(): boolean
  clear(): void
  addRune(rune: any, slot: any, original: any): void
  updateLocked(locked: any): void
  updateOpenSlots(openSlots: any): void
}
declare class NexusCityWorkshopRuneSelectorStandardContainer extends NexusCityWorkshopRuneSelectorContainer {
  SLOT_CLASS: string
  IMAGE_SIZE: string
  TARGET_TYPE: number
}
declare class NexusCityWorkshopRuneSelectorAdvancedContainer extends NexusCityWorkshopRuneSelectorContainer {
  get advancedRuneId(): any
  SLOT_CLASS: string
  IMAGE_SIZE: string
  TARGET_TYPE: number
}
declare class NexusCityWorkshopRuneSlot {
  constructor($body: any, imageSize: any)
  $body: any
  $img: any
  imageSize: any
  slotInRune(rune: any): void
  imagePreload: PreloadImage
  runeId: any
  runeLevel: any
  graceHover: GraceHoverHandler
  reset(): void
}
declare class NexusCityWorkshopRuneSelectorEntry extends NexusCityWorkshopRuneSlot {
  constructor($body: any, slotNumber: any, imageSize: any, controller: any, targetType: any, targetCategoryList: any)
  slotNumber: any
  targetType: any
  targetCategoryList: any
  newRune: boolean
  get runeDescription(): {
    runeId: any
    level: any
    slot: any
  }
  get typeName(): 'Standard' | 'Advanced'
  get categoryName(): 'Any' | 'Offensive' | 'Defensive'
  canEquipRune(rune: any): any
  slotInRune(rune: any, original: any): void
  originalRuneId: any
  originalRuneLevel: any
  slotInNewRune(rune: any): void
  clear(): void
}
declare class NexusCityWorkshopRuneSetupTooltip {
  constructor($container: any)
  $tooltip: any
  $tooltipText: any
  displayMessage(message: any): void
  hideTimeout: NodeJS.Timeout
  hide(): void
  DISPLAY_TIME: number
}
