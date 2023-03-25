declare class QuizAvatarContainer {
  $avatarRow: JQuery<HTMLElement>
  $avatarContainer: JQuery<HTMLElement>
  $enemyContainer: JQuery<HTMLElement>
  _$page: JQuery<HTMLElement>
  _$animeContainer: JQuery<HTMLElement>
  playerSlotMap: {}
  enemySlotMap: {}
  _groupSlotMap: {}
  _currentGroup: number
  delayUpdateRunning: boolean
  set currentGroup(arg: number)
  get currentGroup(): number
  set groupSlotMap(arg: any)
  setupAvatars(players: any, groupSlotMap: any): void
  setupEnemies(enemies: any): void
  addLateJoinAvatars(players: any, groupSlotMap: any): void
  updateAvatarLayout(nexusLayout: any): void
  updateGroupSlotWithDelay(newMap: any, delayInMs: any): void
  updateCurrentGroup(): void
  reset(): void
  MAX_GROUP_SIZE: number
  NEXUS_MODE_CONTAINER_HEIGHT_REDUCTION: number
}
