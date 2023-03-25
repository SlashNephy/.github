declare class NexusCityInnWindow extends NexusCityWindow {
  avatarInfoDisplay: NexusCityAvatarInfoDisplay
  avatarSelectionTab: NexusCityAvatarSelector
  badgeSelectionTab: NexusCityBadgeSelector
  avatarSetupTab: NexusCityInnAvatarSetupTab
  avatarSkinSelectTab: NexusCitySkinSelectTab
  backgroundSelectTab: NexusCityInnBackgroundSelectTab
  teamSelectionTab: NexusCityInnTeamSetupTab
  _nexusWorkshopBaseInfoListener: Listener
  _defaultUpdateListener: Listener
  selectSkin(avatarId: any): void
  updateSelectedSkin(colorId: any, src: any, srcSet: any, backgroundSrc: any, sizeModClass: any): void
  selectBackground(): void
  updateSelectedBackground(avatarId: any, colorId: any, backgroundVert: any): void
  changeTeamAvatarSelect(teamId: any, slotId: any, displayClear: any): void
  changeTeamBadgeSelect(teamCharacters: any, displayClear: any): void
  changeAvatarSetTeam(avatarInfo: any): void
}
declare class NexusCityInnAvatarSetupTab extends NexusCityWindowTab {
  constructor(window: any)
  $image: any
  $imageContainer: any
  $skinSelectButton: any
  $backgroundSelectButton: any
  $toggleOptionButton: any
  $setDefaultButton: any
  $addToTeamTeamButton: any
  defaultUpdateListener: Listener
  get currentAvatarInfo(): {
    avatarId: any
    colorId: any
    backgroundAvatarId: any
    backgroundColorId: any
    optionActive: any
  }
  displayAvatar({
    avatarId,
    characterId,
    backgroundAvatarId,
    backgroundColorId,
    colorId,
    sizeModClass,
    src,
    srcSet,
    backgroundSrc,
    optionName,
    optionActive,
  }: {
    avatarId: any
    characterId: any
    backgroundAvatarId: any
    backgroundColorId: any
    colorId: any
    sizeModClass: any
    src: any
    srcSet: any
    backgroundSrc: any
    optionName: any
    optionActive: any
  }): void
  currentAvatarId: any
  currentCharacterId: any
  currentColorId: any
  defaultColorId: any
  defaultOptionActive: any
  currentOptionActive: any
  defaultBackgroundAvatarId: any
  defaultBackgroundColorId: any
  currentBackgroundAvatarId: any
  currentBackgroundColorId: any
  toggleOption(): void
  loadAvatar(src: any, srcSet: any, sizeModClass: any): void
  imagePreload: PreloadImage
  loadBackground(backgroundSrc: any): void
  updateAvatar(colorId: any, src: any, srcSet: any, backgroundSrc: any, sizeModClass: any): void
  updateBackground(avatarId: any, colorId: any, backgroundVert: any): void
  updateSetDefaultButton(): void
}
declare class NexusCitySkinSelectTab extends NexusCityWindowTab {
  constructor(window: any)
  skinEntries: any[]
  unlockListner: Listener
  displaySkinOptions(avatarId: any): void
  show(): void
  hide(): void
}
declare class NexusCitySkinSelectEntry {
  constructor(
    {
      avatarId,
      colorId,
      name,
      sizeModifierClass,
      src,
      srcSet,
      backgroundSrc,
      unlocked,
    }: {
      avatarId: any
      colorId: any
      name: any
      sizeModifierClass: any
      src: any
      srcSet: any
      backgroundSrc: any
      unlocked: any
    },
    $container: any,
    window: any
  )
  $body: JQuery<any>
  $image: JQuery<HTMLElement>
  avatarId: any
  colorId: any
  unlocked: any
  imagePreload: PreloadImage
  setUnlocked(): void
  template: string
}
declare class NexusCityInnBackgroundSelectTab extends NexusCityWindowTab {
  constructor(window: any)
  $contentContainer: any
  $searchContainer: any
  loadList: any[]
  backgroundEntries: any[]
  loadTimeout: NodeJS.Timeout
  unlockListner: Listener
  show(): void
  hide(): void
  updateScroll(): void
  setupContent(): void
  loadSection(): void
  applySearchFilter(): void
  LOAD_SECTION_SIZE: number
  LOAD_SECTION_DELAY: number
}
declare class NexusCityInnBackgroundGroup {
  constructor(avatarEntry: any, $scrolLContainer: any, window: any)
  $body: JQuery<any>
  $avatarImg: JQuery<HTMLElement>
  $lockedMessage: JQuery<HTMLElement>
  $backgroundScrollContainer: JQuery<HTMLElement>
  $backgroundContainer: JQuery<HTMLElement>
  fullName: any
  imageLoadTriggered: boolean
  avatarId: any
  imagePreload: PreloadImage
  locked: boolean
  backgroundEntries: any
  show(): void
  hide(): void
  handleNewUnlock(avatarId: any, colorId: any): void
  applySearchfilter(searchFilter: any): void
  TEMPLATE: string
}
declare class NexusCityInnBackgroundEntry {
  constructor(
    {
      colorId,
      avatarId,
      backgroundVert,
      name,
      unlocked,
    }: {
      colorId: any
      avatarId: any
      backgroundVert: any
      name: any
      unlocked: any
    },
    $scrollContainer: any,
    window: any
  )
  $body: JQuery<any>
  $image: JQuery<HTMLElement>
  name: any
  colorId: any
  unlocked: any
  imagePreload: PreloadImage
  show(): void
  hide(): void
  triggerImageLoad(): void
  setUnlocked(): void
  TEMPLATE: string
  LAZY_LOAD_OFFSET_MOD: number
}
declare class NexusCityInnTeamSetupTab extends NexusCityTeamSetupTab {
  constructor(window: any)
  $newTeamButton: any
  avatarTarget: any
  selectedSlot: any
  _nexusCreateTeamListener: Listener
  _nexusTeamAvatarUpdate: Listener
  _nexusRenameTeamListener: Listener
  _nexusDeleteTeamListener: Listener
  _nexusTeamAvatarClearListener: Listener
  _nexusTeamBadgeClearListener: Listener
  setAvatarTarget(avatarInfo: any): void
  handleTeamAvatarSlotClick(slot: any): void
  avatarSelectedForTeam(
    teamId: any,
    slotId: any,
    {
      avatarId,
      colorId,
      backgroundAvatarId,
      backgroundColorId,
      optionActive,
    }: {
      avatarId: any
      colorId: any
      backgroundAvatarId: any
      backgroundColorId: any
      optionActive: any
    }
  ): void
  clearSelectedSlot(): void
  handleTeamAvatarBadgeClick(slot: any): void
  badgeSelected(avatarId: any): void
  clearBadgeSelected(): void
  displayTeamNameInput(title: any, callback: any): void
  updateCreateTeamButtonState(): void
  TEAM_NAME_MAX_LENGTH: number
  MAX_TEAM_COUNT: number
}
declare class NexusCityInnTeamRow extends NexusCityTeamRow {
  constructor(teamInfo: any, window: any, tab: any, $container: any, teamNumber: any)
  $renameButton: JQuery<HTMLElement>
  $deleteButton: JQuery<HTMLElement>
  $optionContainer: JQuery<HTMLElement>
  $name: JQuery<HTMLElement>
  rename(newName: any): void
  delete(): void
  clearSlot(slotId: any): void
  clearBadge(slotId: any): void
}
