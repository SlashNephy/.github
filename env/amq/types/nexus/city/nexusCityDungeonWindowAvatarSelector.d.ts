declare class NexusCityDungeonWindowAvatarSelector {
  constructor(selectionWindow: any)
  $container: JQuery<HTMLElement>
  $avatarContainer: JQuery<HTMLElement>
  $backButton: JQuery<HTMLElement>
  selectionWindow: any
  avatarsLoaded: boolean
  availableAvatars: any[]
  lockedAvatars: any[]
  get allAvatars(): any[]
  show(slotNumber: any): void
  currentSlotNumber: any
  hide(): void
  loadAvatars(): void
  handleNewAvatarUnlock(): void
  relayout(): void
  lockCharacter(characterId: any): void
  unlockCharacter(characterId: any): void
  resetAvatars(): void
}
declare class NexusCityDungeonWindowAvatarSelectorEntry {
  constructor(storeAvatar: any, name: any, imgSrc: any, imgSrcset: any, selectorWindow: any)
  $body: JQuery<any>
  $img: JQuery<HTMLElement>
  $nameContainer: JQuery<HTMLElement>
  $name: JQuery<HTMLElement>
  storeAvatar: any
  selectorWindow: any
  characterLocked: boolean
  shouldAdjustTextSize: boolean
  imagePreload: PreloadImage
  get characterId(): any
  get avatarId(): any
  get pickable(): boolean
  triggerLoad(): void
  detatch(): void
  updateTextSize(): void
  updateLockedState(): void
  newCharacterLock(characterId: any): void
  removeCharacterLock(characterId: any): void
  updateCharacterLock(locked: any): void
  TEMPLATE: string
  WORD_COUNT_FOR_TEXT_ADJUST: number
}
