declare class NexusCityWorkshopRuneSelector {
  constructor($window: any)
  $runeContainer: any
  $expandButton: any
  $expandButtonText: any
  runeMap: {}
  expanded: boolean
  filter: NexusCityFilter
  get runeList(): any[]
  getRune(runeId: any, level: any): any
  runeUnequiped(runeId: any, level: any): void
  setupRunes(runes: any): void
  changeToExpandedSize(): void
  changeToNormalSize(): void
  relayout(): void
  loadImages(): void
  expand(): void
  collapse(): void
  updateScroll(): void
  scrollToRune(rune: any): void
  runeSelected(rune: any): void
  selectedRune: any
  clearSelection(): void
  resetSelection(): void
  updateRunes(deletedRunes: any, updatedRunes: any): void
  updateRuneAmounts(deletedRunes: any, updatedRunes: any, newRune: any): void
  clearedRunePage(clearedRunes: any, avatarId: any): void
  SCROLL_OFFSET_TOP: number
}
declare class NexusCityWorkshopRuneSelectorRune {
  constructor(
    {
      description: {
        runeId,
        level,
        name,
        fileName,
        type,
        category,
        description,
        boostPercent,
        statPropName,
        customBoostName,
      },
      amount,
      inUseCount,
      equipedAvatarIds,
    }: {
      description: {
        runeId: any
        level: any
        name: any
        fileName: any
        type: any
        category: any
        description: any
        boostPercent: any
        statPropName?: any
        customBoostName?: any
      }
      amount: any
      inUseCount: any
      equipedAvatarIds: any
    },
    $container: any,
    selector: any
  )
  runeId: any
  level: any
  name: any
  fileName: any
  type: any
  category: any
  selector: any
  boostPercent: any
  statPropName: any
  customBoostName: any
  description: any
  amount: any
  slottedInCount: number
  inUseCount: any
  equipedAvatarIds: any
  $body: JQuery<any>
  $img: JQuery<HTMLElement>
  $amount: JQuery<HTMLElement>
  src: string
  srcSet: string
  imagePreload: PreloadImage
  hoverId: string
  graceHover: GraceHoverHandler
  get availableAmount(): number
  set selected(arg: any)
  unequiped(): void
  slottedIn(): void
  compare(target: any): number
  detach(): void
  remove(): void
  updateAmount(): void
  resetSelection(): void
  TEMPLATE: string
}
