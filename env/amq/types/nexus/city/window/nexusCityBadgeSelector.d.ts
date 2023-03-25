declare class NexusCityBadgeSelector extends NexusCityWindowTab {
  constructor(
    window: any,
    $leftContainer: any,
    $rightContainer: any,
    $tab: any,
    clickHandler: any,
    clearClickHandler?: () => void
  )
  $badgeSelectContainer: any
  badgeEntries: {}
  clickHandler: any
  clearElement: NexusCityAvatarClearEntry
  badgeFilter: NexusCityFilter
  get gotBadges(): boolean
  displayBadges(badgeInfoList: any): void
  updateBadges(badgeInfoList: any): void
  addBadges(badgeInfoList: any): void
  updateBadgeOrder(): void
  updateScroll(): void
  displayClear(): void
  resetActiveCharacters(): void
  updateActiveCharacters(clearedCharacterIds: any, newCharacterIds: any): void
}
declare class NexusCityBadgeEntry {
  constructor(badgeInfo: any, clickCallback: any)
  badgeInfo: any
  $body: JQuery<any>
  $iconContainer: JQuery<HTMLElement>
  $levelText: JQuery<HTMLElement>
  avatarId: any
  colorId: any
  characterId: any
  level: any
  locked: boolean
  name: any
  graceHover: GraceHoverHandler
  updateLevelText(): void
  updateBadgeImage(): void
  badge: NexusBadge
  update(badgeInfo: any): void
  remove(): void
  detatch(): void
  disable(): void
  enable(): void
  TEMPLATE: string
}
