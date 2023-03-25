declare class LobbyAvatarContainer {
  $avatarContainer: JQuery<HTMLElement>
  $leftContainer: JQuery<HTMLElement>
  $rightContainer: JQuery<HTMLElement>
  get leftContainerCount(): number
  get rightContainerCount(): number
  addAvatar(avatarSlot: any): void
  updateLayout(): void
  reset(): void
  AVATAR_SLOT_COUNT: number
  ROW_SIZE: number
}
