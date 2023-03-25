declare class BaseTopIcon {
  updateStatus(current: any, total: any): void
}
declare class StoreTopIcon extends BaseTopIcon {
  constructor(src: any, srcSet: any, callback: any, extraClasses?: any[], badgeSrc?: string, badgeSrcSet?: string)
  childCount: number
  closed: boolean
  active: boolean
  _open: boolean
  _selected: boolean
  set open(arg: boolean)
  get open(): boolean
  set selected(arg: boolean)
  get selected(): boolean
  get childContainerWidth(): number
  get width(): number
  set inFilter(arg: any)
  buildTopIconDomObject(src: any, srcSet: any, badgeSrc: any, badgeSrcSet: any, extraClasses: any): void
  $topIcon: JQuery<any>
  $childContainer: JQuery<HTMLElement>
  $iconImage: JQuery<HTMLElement>
  $childInnerContainer: JQuery<HTMLElement>
  $statusTotal: JQuery<HTMLElement>
  $stautsCurrent: JQuery<HTMLElement>
  $stautsTextContainer: JQuery<HTMLElement>
  $allUnlockedGlow: JQuery<HTMLElement>
  appendChildren(childList: any): void
  ICON_TEMPLATE: string
  CHILD_WIDTH: number
  ICON_WIDTH: number
}
declare class StoreTopIconSkin extends BaseTopIcon {
  constructor(badgeSrc: any, badgeSrcSet: any)
  $topIcon: JQuery<any>
  $statusTotal: JQuery<HTMLElement>
  $stautsCurrent: JQuery<HTMLElement>
  $stautsTextContainer: JQuery<HTMLElement>
  $allUnlockedGlow: JQuery<HTMLElement>
  ICON_TEMPLATE: string
}
