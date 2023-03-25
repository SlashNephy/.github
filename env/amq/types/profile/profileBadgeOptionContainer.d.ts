declare class ProfileBadgeOptionContainer {
  constructor(badgeHandler: any, allBadges: any, $profileContainer: any)
  $profile: any
  $container: any
  $profileBody: any
  $chatBody: any
  $chatContent: any
  $chatBodyPlayerName: any
  $chatBodyPlayerNamBadges: any
  $chatBodySpecialContainer: any
  $chatBodyStandardContainer: any
  $profileToggle: any
  $chatToggle: any
  optionSlots: any[]
  chatSlots: any[]
  activeChatSlots: any[]
  badgesLoaded: boolean
  get shouldPlaceLeft(): boolean
  toggleEdit(on: any): void
  addChatBadge(badgeInfo: any): void
  getNonSpeicalChatBadgeId(): any
  removeChatBadge(badgeId: any): void
  updateChatBadges(): void
  setChatView(): void
  setProfileView(): void
  PROFILE_BADGE_TYPES: number[]
  BADGE_TYPE_ORDER_WEIGHT: {
    1: number
    2: number
    3: number
    4: number
    5: number
    6: number
  }
  CONTAINER_WIDTH: number
}
declare class ProfileOptionBadgeSlot {
  constructor(handleBadgeClick: any, badgeId: any)
  badgeId: any
  $imgContainer: JQuery<HTMLElement>
  setBadge(badgeName: any, unlockDescription: any, fileName: any): void
  badgeFileName: any
  load(): void
  clearSelection(): void
  selected: boolean
  updateState(unlocked: any, active: any, selected: any): void
  BADGE_TEMPLATE: string
}
declare class ProfileOptionChatBadgeSlot extends ProfileOptionBadgeSlot {
  constructor(badgeInfo: any)
  special: any
  weight: any
  updateState(): void
  CHAT_BADGE_ORDER_WEIGHT: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}
