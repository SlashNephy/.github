declare class StoreTopBar {
  constructor(
    $parentWindow: any,
    designs: any,
    unlockedDesigns: any,
    mainContainer: any,
    emoteGroups: any,
    unlockedEmoteIds: any,
    favoriteAvatars: any,
    recentTicketRewards: any,
    rollTargets: any,
    saleInfo: any
  )
  $topBarContentContainer: any
  $topBarContentContainerInner: any
  iconsLoaded: boolean
  characters: any[]
  avatarCharacterIdMap: {}
  tickets: StoreTickets
  emotes: StoreEmoteController
  favorites: StoreFavorites
  selectedCategory: any
  loadCharacters(designs: any, unlockedDesigns: any, mainContainer: any): void
  updateLayout(): void
  updateScrollContainerWidth(): void
  handleCategorySelected(character: any, selected: any): void
  clearAvatarSelection(): void
  closeAll(): void
  getCharacter(characterId: any): any
  getAvatar(avatarId: any): any
  filterUpdate(newFilter: any): void
  disable(): void
  enable(): void
  SCROLL_CORRECTION: number
  SCROLL_BAR_OFFSET: number
}
