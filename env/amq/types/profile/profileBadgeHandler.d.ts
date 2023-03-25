declare class ProfileBadgeHandler {
  constructor(allBadges: any, activeBadges: any)
  badgeMap: {}
  selectedOptionBadge: any
  selectedSlot: any
  setActive(badgeId: any, slot: any): void
  attachOptionSlot(badgeId: any, slot: any): void
  attachChatSlot(badgeId: any, slot: any): void
  slotSelected(slot: any): void
  optionClick(badgeId: any): void
  getBadge(badgeId: any): any
  clearSelected(badgeId: any): void
  handleBadgeSelectedForSlot(): void
  resetSelection(): void
}
declare class ProfileBadge {
  constructor(badgeInfo: any)
  name: any
  unlockDescription: any
  fileName: any
  id: any
  special: any
  unlocked: any
  showInChat: any
  badgeSlot: any
  optionSlot: any
  chatSlott: any
  get active(): boolean
  get canSelect(): boolean
  showInSlot(slot: any): void
  attachOptionSlot(slot: any): void
  attachChatSlot(slot: any): void
  chatSlot: any
  updateOptionState(selected: any): void
  updateChatState(): void
  clearBadgeSlot(): void
}
