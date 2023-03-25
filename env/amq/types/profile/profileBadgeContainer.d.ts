declare class ProfileBadgeContainer {
  constructor(badgeHandler: any, profileBadges: any, $profile: any)
  $badgeContainer: any
  $noBadgeContainer: any
  badgeSlotMap: {
    1: ProfileBadgeSlot
    2: ProfileBadgeSlot
    3: ProfileBadgeSlot
    4: ProfileBadgeSlot
    5: ProfileBadgeSlot
    6: ProfileBadgeSlot
    7: ProfileBadgeSlot
    8: ProfileBadgeSlot
    9: ProfileBadgeSlot
  }
  badgeHandler: any
  activeBadgeCount: any
  set selectedSlot(arg: any)
  get selectedSlot(): any
  showBadge(badge: any, slot: any): void
  toggleNoBadges(on: any): void
  toggleEdit(on: any): void
  handleBadgeClear(): void
}
declare class ProfileBadgeSlot {
  constructor($container: any, slotNumber: any, selectionHandler: any, clearHandler: any)
  $container: any
  slotNumber: any
  clearHandler: any
  currentBadgeId: any
  $image: any
  $clearButton: any
  _selected: boolean
  _editActive: boolean
  get activeBadge(): boolean
  set editActive(arg: boolean)
  get editActive(): boolean
  set selected(arg: boolean)
  get selected(): boolean
  showBadge(badge: any): void
  fireClear(): void
  clearBadge(): void
}
