declare class ProfileStatsLine {
  constructor($line: any, fieldName: any, hide: any, adminDisplay: any)
  $line: any
  fieldName: any
  $hider: any
  $hideToogle: any
  $hideTooglIcon: any
  set hide(arg: any)
  get hide(): any
  _hide: any
  HIDE_TOOGLE_ICON_CLASSES: {
    ACTIVE: string
    INACTIVE: string
  }
}
declare class ListProfileStatsLine extends ProfileStatsLine {
  constructor($line: any, fieldName: any, hide: any, adminView: any, listId: any, username: any, urlUsername: any)
  $lineName: any
  $lineValue: any
  $listToogle: any
  get listName(): any
  get listUrl(): string
  get nextListId(): any
  updateList(listId: any, username: any, urlUsername: any): void
  _listId: any
  _userName: any
  _urlUsername: any
  LIST_ID_NAME_MAP: {
    1: string
    2: string
    3: string
  }
  LIST_ID_BASE_URL_MAP: {
    1: string
    2: string
    3: string
  }
  LINK_TEMPLATE: string
}
