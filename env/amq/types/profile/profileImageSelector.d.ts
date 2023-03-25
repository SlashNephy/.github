declare class ProfileImageSelector {
  constructor($profile: any, avatarImage: any, emoteImageId: any, avatarSrc: any, avatarSrcSet: any)
  $avatarButton: any
  $emoteContainer: any
  $profileImage: any
  displayLoaded: boolean
  emoteImageId: any
  avatarImage: any
  avatarSrc: any
  avatarSrcSet: any
  emoteEntries: {}
  newSelect(avatarImage: any, emoteId: any): void
  displayed(): void
}
declare class ProfileImageSelectorEmote {
  constructor(emoteInfo: any, active: any, $emoteContainer: any, selectHandler: any)
  $tile: JQuery<any>
  src: any
  srcSet: any
  id: any
  set selected(arg: any)
  preLoadImage: PreloadImage
  TEMPALTE: string
}
