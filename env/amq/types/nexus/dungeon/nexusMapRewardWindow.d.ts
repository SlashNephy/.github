declare class NexusMapRewardWindow extends NexusDungeonBaseWindow {
  constructor()
  $closeButton: any
  $fragmentCounter: any
  $artifactRow: any
  $runeModRow: any
  $runeModNoDropText: any
  $runeCounter: any
  $runeCounterText: any
  rewardPreview: NexusWindowItemPreview
  currentArtifacts: any[]
  currentRuneMods: any[]
  _nexusHighlightArtifactReward: Listener
  _nexusCloseArtifactReward: Listener
  set fragments(arg: any)
  highlightTargetArtifact(artifactName: any, avatarName: any): void
  displayArtifacts(artifacts: any, avatarDescriptions: any, soloReward: any, maxThree: any): void
  displayRuneMods(runeMods: any): void
  clearAllArtifactSelections(): void
  getSelectedArtifactsInfo(): {
    artifactName: any
    avatarName: any
  }[]
  displayArtifactVote(avatarName: any, artifactName: any, voteIcon: any, gamePlayerId: any): void
}
declare class NexusOptionBase {
  constructor(
    {
      name,
      fileName,
      description,
    }: {
      name: any
      fileName: any
      description: any
    },
    rewardPreview: any
  )
  name: any
  $body: JQuery<any>
  $img: JQuery<HTMLElement>
  $voteContainer: JQuery<HTMLElement>
  active: boolean
  voteHighlights: {}
  imagePreload: PreloadImage
  createImgSrc(): void
  createImgSrcSet(): void
  remove(): void
  displayVote(avatarName: any, voteIcon: any, gamePlayerId: any): void
  clearPlayerVote(gamePlayerId: any): void
  clearAllPlayerVotes(): void
  VOTE_ROW_TEMPLATE: string
}
declare class NexusArtifactOptionBase extends NexusOptionBase {
  constructor(
    {
      name,
      fileName,
      description,
    }: {
      name: any
      fileName: any
      description: any
    },
    avatarDescriptions: any,
    rewardPreview: any,
    maxThree: any
  )
  $avatarTargetContainer: JQuery<HTMLElement>
  $selectedAvatarContainer: JQuery<HTMLElement>
  selectedAvatar: any
  targetsShown: boolean
  artifactName: any
  avatarTargets: any
  hideHandlerFunction: any
  createImgSrc(fileName: any): string
  createImgSrcSet(fileName: any): string
  displayTargetContainer(): void
  hideTargetContainer(): void
  highlightAvatar(avatarName: any): void
  getTagerAvatar(avatarName: any): any
  removeTarget(avatarName: any): void
  handleAvatarSelect(avatarName: any): void
  selectAvatar($avatarImg: any, avatarName: any): void
  clearSelection(): void
  TEMPLATE: string
}
declare class NexusArtifactRewardOption extends NexusArtifactOptionBase {
  constructor(
    {
      name,
      fileName,
      description,
    }: {
      name: any
      fileName: any
      description: any
    },
    avatarDescriptions: any,
    rewardWindow: any,
    soloReward: any,
    rewardPreview: any,
    maxThree: any
  )
  rewardWindow: any
  soloReward: any
}
declare class NexusArtifactRewardAvatarTarget {
  constructor(
    {
      avatarName,
      outfitName,
      optionName,
      optionActive,
      colorName,
    }: {
      avatarName: any
      outfitName: any
      optionName: any
      optionActive: any
      colorName: any
    },
    clickHandler: any
  )
  name: any
  $body: JQuery<HTMLElement>
  $img: JQuery<HTMLElement>
  $selectedImage: JQuery<HTMLElement>
  preloadImage: PreloadImage
  remove(): void
  TEMPLATE: string
  SELECTED_ICON_TEMPLATE: string
}
declare class NexusRuneModReward {
  constructor(name: any, fileName: any, description: any, rewardPreview: any)
  $body: JQuery<any>
  $img: JQuery<HTMLElement>
  imagePreload: PreloadImage
  remove(): void
  TEMPLATE: string
}
