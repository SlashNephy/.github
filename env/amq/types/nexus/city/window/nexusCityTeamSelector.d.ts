declare class NexusCityTeamSetupTab extends NexusCityWindowTab {
  constructor(
    window: any,
    $leftContainer: any,
    $rightContainer: any,
    $tab: any,
    $teamContainer: any,
    teamRowClass: any,
    avatarInfoDisplay: any
  )
  $teamContainer: any
  teamRowClass: any
  avatarInfoDisplay: any
  teamMap: {}
  get currentTeamCount(): number
  handleTeamAvatarSlotClick(): void
  handleTeamClick(): void
  handleTeamAvatarBadgeClick(): void
  handleTeamAvatarSlotHover(slot: any): void
  addTeam(teamInfo: any): void
  setupTeams(teams: any): void
  updateAvatarLevels(avatarInfoList: any): void
}
declare class NexusCityTeamRow {
  constructor(
    {
      teamId,
      name,
      avatars,
      badges,
    }: {
      teamId: any
      name: any
      avatars: any
      badges: any
    },
    window: any,
    tab: any,
    $container: any,
    teamNumber: any
  )
  $body: JQuery<any>
  teamId: any
  name: any
  $container: any
  window: any
  slots: {
    1: NexusCityTeamSlot
    2: NexusCityTeamSlot
    3: NexusCityTeamSlot
    4: NexusCityTeamSlot
  }
  get editableBadge(): boolean
  getTeamCharacterIds(): any[]
  updateAvatars(avatars: any): void
  updateBadges(badges: any): void
  triggerLazyLoad(): void
  updateAvatarLevels(avatarInfoList: any): void
  TEMPLATE: string
}
declare class NexusCityTeamSlot {
  constructor($body: any, teamId: any, slotId: any, tab: any, editableBadge: any)
  $body: any
  $img: any
  $badgeContainer: any
  $emptyNumber: any
  $selectedNumber: any
  editableBadge: any
  emptyBadge: NexusBadgeEmpty
  currentBadge: NexusBadgeEmpty
  badgeGraceHover: GraceHoverHandler
  teamId: any
  slotId: any
  avatarInfo: any
  get badgeClasses(): string[]
  get gotAvatar(): boolean
  get characterId(): any
  get gotBadge(): boolean
  checkNewAvatarDescription(avatarId: any, colorId: any, backgroundAvatarId: any, backgroundColorId: any): boolean
  displayLoading(): void
  displayAvatar(avatarInfo: any, $lazyLoadContainer: any, $row: any): void
  preloadImage: PreloadImage
  updateBadge(badgeInfo: any): void
  clearBadge(): void
  clearBadgeContainer(): void
  updateAvatarLevel(avatarInfoList: any): void
  displayEmpty(): void
}
