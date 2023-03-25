declare class StoreWindow {
  $window: JQuery<HTMLElement>
  $rhythmText: JQuery<HTMLElement>
  $avatarTokenText: JQuery<HTMLElement>
  $storeIconAvatar: JQuery<HTMLElement>
  _open: boolean
  _rhythm: number
  _avatarTokens: number
  unlockedEmoteIds: {}
  _inBackgroundMode: boolean
  useAvatarListener: Listener
  unlockListner: Listener
  lockListner: Listener
  emoteUnlockListner: Listener
  emoteLockedListner: Listener
  newFavoriteListener: Listener
  removeFavoriteListener: Listener
  set open(arg: boolean)
  get open(): boolean
  get activeAvatar(): any
  get activeBackground(): any
  set inBackgroundMode(arg: boolean)
  get inBackgroundMode(): boolean
  set rhythm(arg: number)
  get rhythm(): number
  set avatarTokens(arg: number)
  get avatarTokens(): number
  setup(
    defaultDesigns: any,
    unlockedDesigns: any,
    currentAvatar: any,
    characterUnlockCount: any,
    avatarUnlockCount: any,
    emoteGroups: any,
    rhythm: any,
    unlockedEmoteIds: any,
    favoriteAvatars: any,
    recentTicketRewards: any,
    avatarTokens: any,
    rollTargets: any,
    saleInfo: any
  ): void
  characterUnlockCount: any
  avatarUnlockCount: any
  _activeAvatarBackground: any
  mainContainer: StoreMainContainer
  storeFilter: StoreFilter
  avatarColumn: StoreAvatarColumn
  topBar: StoreTopBar
  rhythmBubbleTextController: BubbleTextController
  avatarTokenBubbleTextController: BubbleTextController
  reset(): void
  show(): void
  showSkin(characterId: any, avatarId: any): void
  resize(): void
  hide(): void
  toggle(): void
  getAvatar(characterId: any, avatarId: any): any
  getAvatarFromAvatarId(avatarId: any): any
  filterChangeEvent(): void
  toggleBackgroundSelect(): void
  getAvatarBonusUnlocked(avatarId: any): boolean
  disableTopBar(): void
  enableTopBar(): void
  getAllEmotes(): any[]
  getEmote(emoteId: any): any
  setStoreIconAvatar(currentAvatar: any): void
  getFavoriteId(avatar: any, background: any): any
  handleAvatarSelected(avatarDescription: any, backgroundDescription: any): void
  messageContainEmote(msg: any): boolean
  getAllAvatars(): any[]
  showTicketStore(): void
  REQUIRED_COUNT_FOR_BONUS: number
}
declare var storeWindow: StoreWindow
