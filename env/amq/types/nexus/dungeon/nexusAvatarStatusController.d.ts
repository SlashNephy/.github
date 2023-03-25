declare class NexusAvatarStatusController {
  $statusContainer: JQuery<HTMLElement>
  entries: {}
  entryList: any[]
  addAvatar(avatarInfo: any): void
  getAvatar(avatarName: any): any
  reset(): void
  updateHp(name: any, newHp: any): void
  updateCooldown(name: any, currentCooldown: any): void
  getAvatarDescriptions(): any[]
  addArtifactToAvatar(avatarName: any, artifactInfo: any): void
  removeArtifactFromAvatar(avatarName: any, artifactName: any): void
}
declare class NexusAvatarStatusEntry {
  constructor({
    name,
    hp,
    maxHp,
    avatar,
    artifacts,
    baseStats,
    runeInfo,
    genreInfo,
    abilityInfo,
    statusDisplayName,
    badgeInfo,
  }: {
    name: any
    hp: any
    maxHp: any
    avatar: any
    artifacts: any
    baseStats: any
    runeInfo: any
    genreInfo: any
    abilityInfo: any
    statusDisplayName: any
    badgeInfo: any
  })
  name: any
  hp: any
  maxHp: any
  avatarInfo: any
  currentCooldown: any
  artifactMap: {}
  artifactGraceHoverMap: {}
  currentArtifactHeight: number
  $body: JQuery<any>
  $hpBar: JQuery<HTMLElement>
  $emptyMessage: JQuery<HTMLElement>
  $artifactRow: JQuery<HTMLElement>
  $artifactRowInner: JQuery<HTMLElement>
  $image: JQuery<HTMLElement>
  $hpText: JQuery<HTMLElement>
  $nameContainer: JQuery<HTMLElement>
  $name: JQuery<HTMLElement>
  graceHover: GraceHoverHandler
  get hpPercent(): number
  get avatarDescription(): {
    avatarInfo: any
    alive: boolean
    artifactCount: number
  }
  get artifactCount(): number
  get artifacts(): any[]
  resizeName(): void
  updateHp(newHp: any): void
  updateHpBar(): void
  addArtifact({ name, fileName, description }: { name: any; fileName: any; description: any }): void
  artifactsLargerThanContainer(): boolean
  resizeArtifacts(): void
  resetArtifactSize(): void
  removeArtifact(artifactName: any): void
  TEMPLATE: string
  ARTIFACT_TEMPLATE: string
  ARTIFACT_DEFAULT_SIZE: number
  ARTIFACT_MIN_SIZE: number
  ARTIFACT_SIZE_STEP: number
  ARTIFACT_SIZE_GRACE: number
}
