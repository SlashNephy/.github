declare class NexusDungeonResultWindow extends NexusDungeonBaseWindow {
  constructor()
  $headerText: JQuery<HTMLElement>
  $continueButton: any
  $title: any
  xpController: NexusDungeonResultWindowXpController
  avatarController: NexusDungeonResultWindowAvatarController
  runeModController: NexusDungeonResultWindowRuneModsController
  reset(): void
  displayResult(xpResults: any, avatarList: any, avatarXpInfo: any, runeMods: any, title: any): void
  XP_ANIMATION_TIME_MS: number
  XP_BAR_ANIMATION_TIME_MS: number
  RUNE_MODS_ANIMATION_TIME_MS: number
}
declare class NexusDungeonResultWindowXpController {
  constructor($window: any, counterSpeed: any, completedCallback: any)
  $xpRewardRow: any
  xpMainCounter: TextCounter
  currentEntries: any[]
  reset(): void
  displayEntries(entries: any, totalSpeedMs: any): void
}
declare class NexusDungeonResultWindowXpEntry {
  constructor(
    {
      name,
      entryCount,
      xpCount,
    }: {
      name: any
      entryCount: any
      xpCount: any
    },
    speedMs: any
  )
  $body: JQuery<any>
  $nameCount: JQuery<HTMLElement>
  xpCount: any
  counter: TextCounter
  get counterFinished(): boolean
  startCounter(): void
  TEMPALTE: string
}
declare class NexusDungeonResultWindowAvatarController {
  constructor($window: any, animationDoneCallback: any)
  $avatarRow: any
  animationDoneCallback: any
  currentAvatars: any[]
  reset(): void
  displayAvatars(avatarlist: any, avatarXpInfo: any): void
  handleAnimationFinished(): void
  runAnimations(durationMs: any): void
}
declare class NexusDungeonResultWindowAvatarEntry {
  constructor(
    {
      avatarName,
      outfitName,
      optionName,
      optionActive,
      colorName,
      sizeModifier,
    }: {
      avatarName: any
      outfitName: any
      optionName: any
      optionActive: any
      colorName: any
      sizeModifier: any
    },
    backgroundVert: any,
    {
      originalXpState,
      newXpState,
    }: {
      originalXpState: any
      newXpState: any
    },
    updateFinishedCallback: any
  )
  $body: JQuery<HTMLElement>
  $img: JQuery<HTMLElement>
  $levelText: JQuery<HTMLElement>
  $xpBar: JQuery<HTMLElement>
  $rewardContainer: JQuery<HTMLElement>
  set levelText(arg: any)
  originalXpState: any
  newXpState: any
  updateFinishedCallback: any
  get animationDone(): boolean
  updateXpPercent(newPercent: any, transitionTimeMs: any): void
  displayNewState(durationMs: any): void
  levelUpSteps:
    | {
        level: any
        targetXpPercent: number
        reset: boolean
        durationMs: any
      }[]
    | (
        | {
            level: any
            targetXpPercent: number
            reset: boolean
            durationMs: number
            levelUpRewards?: undefined
          }
        | {
            level: any
            targetXpPercent: number
            reset: boolean
            durationMs: number
            levelUpRewards: any
          }
      )[]
    | {
        level: any
        targetXpPercent: number
        reset: boolean
        durationMs: number
      }[]
  runAnimationStep(): void
  TEMPLATE: string
  LEVEL_UP_REWARD_TEMPLATE: string
  MAX_LEVEL: number
}
declare class NexusDungeonResultWindowRuneModsController {
  constructor($window: any, animationDoneCallback: any)
  $runeModRow: any
  animationDoneCallback: any
  baseCapacity: number
  currentRuneMods: any[]
  reset(): void
  displayRuneMods(runeModList: any, animationTimeMs: any): void
  calculatePositionBasis(runeModList: any): {
    startX: number
    offsetIncrease: number
  }
  runAnimations(durationMs: any): void
  BASE_CONTAINER_WIDTH: number
  FULL_CONTAINER_WIDTH: number
  FULL_ROW_WIDTH: number
  RUNE_MOD_SIZE: number
  BASE_CONTAINER_EXTRA_CAPACITY: number
  FADE_IN_TOGGLE_SPEED_INCREASE: number
}
declare class NexusDungeonResultWindowRuneModEntry {
  constructor(
    {
      name,
      fileName,
    }: {
      name: any
      fileName: any
    },
    offset: any,
    fadeTime: any
  )
  $body: JQuery<HTMLElement>
  display(): void
  TEMPLATE: string
}
