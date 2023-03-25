declare class SocialTabFriendEntry {
  constructor(friendInfo: any, offline: any, $scrollContainer: any)
  status: any
  name: any
  $html: JQuery<any>
  $nameContainer: JQuery<HTMLElement>
  $name: JQuery<HTMLHeadingElement>
  $sociaiStatusText: JQuery<HTMLElement>
  $scrollContainer: any
  inList: any
  inGame: boolean
  gameState: any
  get colorStatusClass():
    | 'socialTabPlayerSocialStatusInnerCircleColorOnline'
    | 'socialTabPlayerSocialStatusInnerCircleColorDoNotDisturb'
    | 'socialTabPlayerSocialStatusInnerCircleColorAway'
    | 'socialTabPlayerSocialStatusInnerCircleColorOffline'
  get statusText(): 'Offline' | 'Online' | 'Do Not Disturb' | 'Away'
  updateName(newName: any): void
  updateTextSize(): void
  destroy(): void
  updateStatus(newStatus: any, gameState: any): void
  detach(): void
  updateAvatar(avatarInfo: any): void
  imagePreload: PreloadImage
  checkLazyLoad(): void
  TEMPLATE: string
}
