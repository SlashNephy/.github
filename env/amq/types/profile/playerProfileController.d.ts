declare class PlayerProfileController {
  PROFILE_WIDTH: number
  PROFILE_HEIGHT: number
  open: boolean
  currentProfile: PlayerProfile
  editToggleOnListener: any
  loadProfileIfClosed(
    profileName: any,
    $requestObject: any,
    offsetCorrections: any,
    closeHandler: any,
    offline: any,
    inGame: any
  ): void
  loadProfile(
    profileName: any,
    $requestObject: any,
    offsetCorrections: any,
    closeHandler: any,
    offline: any,
    inGame: any
  ): void
  clearProfiles(): void
  toogleEdit(): void
  calculateOffset(
    $requestObject: any,
    offsetCorrections: any
  ): {
    x: any
    y: any
  }
  displayProfile(profileInfo: any, offset: any, closeHandler: any, offline: any, inGame: any): void
  $PROFILE_LAYER: JQuery<HTMLElement>
}
declare var playerProfileController: PlayerProfileController
