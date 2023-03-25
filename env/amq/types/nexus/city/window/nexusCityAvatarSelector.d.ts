declare class NexusCityAvatarSelector extends NexusCityWindowTab {
  constructor(
    window: any,
    $leftContainer: any,
    $rightContainer: any,
    $tab: any,
    selectorPreview: any,
    avatarEntryClass: any,
    clickHandler: any,
    extraOrderFilterInfo?: any[],
    clearPreviewOnHide?: boolean,
    clearClickHandler?: () => void
  )
  $avatarSelectionContainer: any
  avatarEntries: {}
  disabledCharacterIds: {}
  avatarEntryClass: any
  clickHandler: (avatarEntry: any) => void
  clearElement: NexusCityAvatarClearEntry
  selectorPreview: any
  clearPreviewOnHide: boolean
  customSelectionCallback: any
  avatarFilter: NexusCityFilter
  get entryList(): any[]
  updateScroll(): void
  triggerImageLoads(): void
  displayAvatars(avatarInfoList: any): void
  addAvatars(avatarInfoList: any): void
  displayFirstAvatar(): void
  avatarUnlocks(avatarInfoList: any): void
  displayClear(): void
  getAvatarInfo(avatarId: any): any
  updateAvatarOrder(): void
  disableCharacter(characterId: any): void
  enableCharacter(characterId: any): void
  updateAvatarInfo(avatarId: any, level: any, baseStats: any): void
  updateDefaultAvatarSkin(
    avatarId: any,
    colorId: any,
    backgroundAvatarId: any,
    backgroundColorId: any,
    optionActive: any
  ): void
  setSelectionCallback(callback: any): void
}
declare class NexusCityAvatarEntry {
  constructor(
    {
      avatarInfo: {
        avatarId,
        colorId,
        backgroundAvatarId,
        backgroundColorId,
        optionActive,
        level,
        abilityInfo,
        genreInfo,
      },
      baseStats,
      runes,
      locked,
      earlyAccess,
      earlyAccessEndDate,
    }: {
      avatarInfo: {
        avatarId: any
        colorId: any
        backgroundAvatarId: any
        backgroundColorId: any
        optionActive: any
        level: any
        abilityInfo: any
        genreInfo: any
      }
      baseStats: any
      runes: any
      locked: any
      earlyAccess: any
      earlyAccessEndDate: any
    },
    $container: any,
    hoverCallback: any,
    clickCallback: any
  )
  $body: JQuery<any>
  $img: JQuery<HTMLElement>
  $emptyRuneSlotCounter: JQuery<HTMLElement>
  $levelText: JQuery<HTMLElement>
  $earlyAccessIcon: JQuery<HTMLElement>
  avatarId: any
  colorId: any
  backgroundAvatarId: any
  backgroundColorId: any
  abilityInfo: any
  locked: any
  earlyAccess: any
  characterId: any
  level: any
  baseStats: any
  runeInfo: any
  genreInfo: any
  optionName: any
  optionActive: any
  name: any
  sizeModClass: any
  src: string
  srcSet: string
  backgroundSrc: string
  imagePreload: PreloadImage
  abilityHover: GraceHoverHandler
  clickCallback: any
  unlocked({ avatarId, colorId }: { avatarId: any; colorId: any }): void
  updateLevelText(): void
  updateAvatarColor(colorId: any, optionActive: any): void
  updateAvatarBackground(avatarId: any, colorId: any): void
  get avatarInfo(): {
    avatarId: any
    level: any
    src: string
    srcSet: string
    name: any
    sizeModClass: any
    backgroundSrc: string
    baseStats: any
    runeInfo: any
    genreInfo: any
    abilityInfo: any
  }
  remove(): void
  detatch(): void
  triggerImageLoadCheck(): void
  disable(): void
  enable(): void
  TEMPLATE: string
  PATREON_LEVLE_FOR_EARLY_ACCESS: number
}
declare class NexusCityAvatarClearEntry {
  constructor(clickHandler: any)
  $body: JQuery<any>
  $textContainer: JQuery<HTMLElement>
  level: number
  name: string
  detatch(): void
  TEMPLATE: string
}
