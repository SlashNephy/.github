declare class NexusCityAvatarInfoDisplay {
  constructor($container: any, statBaseMax: any, autoScroll: any)
  $avatarImage: any
  $avatarContainer: any
  $nameContainer: any
  $name: any
  $level: any
  $specialBuffList: any
  autoScroll: any
  currentAvatarId: any
  speciaBuffs: {}
  specialBuffList: any[]
  statsBars: {
    cont: NexusCityAvatarInfoDisplayStatLine
    def: NexusCityAvatarInfoDisplayStatLine
    dodge: NexusCityAvatarInfoDisplayStatLine
    atk: NexusCityAvatarInfoDisplayStatLine
    acc: NexusCityAvatarInfoDisplayStatLine
  }
  genreIcons: {
    Strong: {
      0: NexusCityAvatarInfoDisplayGenreIcon
      1: NexusCityAvatarInfoDisplayGenreIcon
      2: NexusCityAvatarInfoDisplayGenreIcon
    }
    Weak: {
      0: NexusCityAvatarInfoDisplayGenreIcon
      1: NexusCityAvatarInfoDisplayGenreIcon
    }
  }
  statBaseMax: any
  reset(): void
  displayAvatar({
    avatarId,
    src,
    srcSet,
    backgroundSrc,
    name,
    level,
    sizeModClass,
    baseStats,
    runeInfo,
    genreInfo,
  }: {
    avatarId: any
    src: any
    srcSet: any
    backgroundSrc: any
    name: any
    level: any
    sizeModClass: any
    baseStats: any
    runeInfo: any
    genreInfo: any
  }): void
  imagePreload: PreloadImage
  displayStats(baseStats: any, runeInfo: any, genreInfo: any): void
  avatarUpdate({
    avatarId,
    src,
    srcSet,
    backgroundSrc,
    sizeModClass,
  }: {
    avatarId: any
    src: any
    srcSet: any
    backgroundSrc: any
    sizeModClass: any
  }): void
  relayout(): void
  setRuneBoosts(runes: any, noScroll: any): void
  newRune(rune: any): void
  removeRune(rune: any): void
  handleNewSpecialRune(rune: any, noScroll: any): void
  resetBoosts(): void
  updateBuffScroll(): void
  triggerAutoScroll(): void
  autoScrollInterval: NodeJS.Timer
  AUTO_SCROLL_FRAME_SPEED: number
  AUTO_SCROLL_SPEED: number
}
declare class NexusCityAvatarInfoDisplayStatLine {
  constructor($container: any)
  $baseBar: any
  $baseValueText: any
  $runeIncreaseText: any
  $runeIncreaseBar: any
  runePercentIncrease: number
  setupBaseState(baseStat: any, maxStat: any): void
  baseStat: any
  maxStat: any
  updateRuneIncrease(): void
}
declare class NexusCityAvatarInfoDisplaySpecialStatLine {
  constructor(name: any, percent: any, fullName: any)
  name: any
  percent: any
  fullName: any
  $body: JQuery<HTMLElement>
  $clone: JQuery<HTMLElement>
  get percentString(): any
  get description(): any
  updateText(): void
  TEMPLATE: string
}
declare class NexusCityAvatarInfoDisplayGenreIcon {
  constructor($icon: any, strong: any)
  $icon: any
  strong: any
  popoverMessage: string
  popoverTitle: string
  displayGenre({ name, active }: { name: any; active: any }): void
  reset(): void
}
