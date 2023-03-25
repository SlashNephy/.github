declare function SocialTab(): void
declare class SocialTab {
  _tab: JQuery<HTMLElement>
  _friendEntryTemplate: string
  _onlineFriendCounter: JQuery<HTMLElement>
  $onlineFriendList: JQuery<HTMLElement>
  $offlineFriendList: JQuery<HTMLElement>
  $friendView: JQuery<HTMLElement>
  $friendsButton: JQuery<HTMLElement>
  $allUsersView: JQuery<HTMLElement>
  $allUsersButton: JQuery<HTMLElement>
  $ownProfileButton: JQuery<HTMLElement>
  ownProfileXOffset: number
  _$SOCIAL_TAB_CONTAINER: JQuery<HTMLElement>
  onlineFriends: {}
  offlineFriends: {}
  blockedPlayers: any[]
  chatBar: ChatBar
  socialStatus: SocialStatus
  _newFriendListener: Listener
  _friendStateChangeListener: Listener
  _friendRemoveListener: Listener
  _friendNameChangeListener: Listener
  _friendSocialStatusChangeListener: Listener
  _friendProfilePictureChangeListener: Listener
  setup(friends: any, blockedPlayers: any): void
  allPlayerList: AllPlayersList
  openClose(): void
  close(): void
  changeToAllUsers(): void
  changeToFriends(): void
  openOwnProfile(): void
  triggerFriendLazyLoad(): void
  updateOnline(): void
  updateOnlineFriendCount(): void
  updateOffline(): void
  updateFriendList(friendMap: any, type: any, $list: any): void
  _handleOpen(): void
  updateScrollbar(): void
  addToOnlineFriends(friend: any): void
  addToOfflineFriends(friend: any): void
  removeFriend(name: any): void
  sendFriendRequest(playerName: any): void
  blockPlayer(playerName: any): void
  addBlockedPlayer(playerName: any): void
  removeBlockedPlayer(playerName: any): void
  unblockPlayer(playerName: any): void
  startChat(playerName: any): void
  getAllFriends(): string[]
  isFriend(name: any): any
  isBlocked(name: any): boolean
}
declare function sortFriends(friendA: any, friendB: any): any
declare var socialTab: SocialTab
