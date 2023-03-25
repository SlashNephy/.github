declare class StoreTile {
  constructor(
    imgSrc: any,
    imgSrcset: any,
    backgroundSrc: any,
    name: any,
    tag: any,
    notePrice: any,
    realMoneyPrice: any,
    colorTicketTier: any,
    avatarTicketTier: any,
    patreonTierToUnlock: any,
    defaultImageSize: any,
    extraClasses?: any[],
    uniqueUnlock?: boolean,
    eventColor?: boolean
  )
  colorTicketTier: any
  onloadCallbacks: any[]
  buildTileFunction: () => void
  _$tile: JQuery<any>
  _imagePreload: PreloadImage
  get $tile(): JQuery<any>
  get imagePreload(): PreloadImage
  set storeFade(arg: any)
  addOnloadCallback(callback: any): void
  updateTextSize(): void
  updateFirstRowString(newPriceString: any): void
  addUnlockedClass(): void
  removeUnlockedClass(): void
  turnOffSecondRow(): void
  TILE_TEMPLATE: string
  TARGET_FONT_SIZE: number
  MIN_FONT_SIZE: number
}
declare namespace STORE_TILE_SIZE_MOD_FORMATS {
  const sizeMod0: string
  const sizeMod20: string
  const sizeMod51: string
}
declare class StorePreviewTile extends StoreTile {
  constructor(storeAvatar: any)
}
declare class StoreAvatarTile extends StoreTile {
  constructor(storeColor: any)
}
declare class StoreEmoteTile extends StoreTile {
  constructor(storeEmote: any)
}
