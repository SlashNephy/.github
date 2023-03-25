declare class StoreTicketRollSelector {
  constructor($ticketOptionContainer: any, historyHandler: any, rollTargets: any)
  $mainContainer: JQuery<HTMLElement>
  $selectContainer: JQuery<HTMLElement>
  $oneRollButton: JQuery<HTMLElement>
  $tenRollButton: JQuery<HTMLElement>
  $executeContainer: JQuery<HTMLElement>
  $executeButtonContainer: JQuery<HTMLElement>
  $executeCloseButton: JQuery<HTMLElement>
  $executeRollButton: JQuery<HTMLElement>
  $executeRollPrice: JQuery<HTMLElement>
  $innerResultContainer: JQuery<HTMLElement>
  $executeTicketImage: JQuery<HTMLElement>
  $swTicketAvatarLockingImage: JQuery<HTMLElement>
  $executionHideable: JQuery<HTMLElement>
  $ticketOptionContainer: any
  historyHandler: any
  targetSelector: StoreTickRollTargetSelector
  outsideRewardContainers: (StoreOuterRewardContainer | StoreOuterMajorRewardContainer)[]
  insideRewardContainer: StoreInsdeRewardContainer
  animationController: StoreRollAnimationController
  rewardTimerTriggered: boolean
  rollResultListener: Listener
  rollErrorListener: Listener
  hide(): void
  show(): void
  resize(): void
  displayRollSelection(): void
  displayRollExecute(price: any): void
  activePrice: any
  executeSingleRoll(): void
  executeTenRoll(): void
  executeReward(): void
  currentRewards: any
  showSingleResult(result: any): void
  showMultipleResults(results: any): void
  handleDisplayMultiRollTierResults(tierDistribution: any, currentIndex?: number): void
  handleDisplayMultiRollTierEndResult(tierDistribution: any): void
  loadCenterImage(tier: any, callback: any): void
  ONE_ROLL_PRICE: number
  TEN_ROLL_PRICE: number
  DEFAULT_TIER: number
  ONE_ROLL_TOKEN_PRICE: number
  TEN_ROLL_TOKEN_PRICE: number
}
declare class StoreRollAnimationController {
  constructor(defaultTier: any)
  defaultTier: any
  innerController: StoreRollInnerAnimationController
  outerController: StoreRollOuterAnimationController
  running: boolean
  clear: boolean
  show(): void
  startAnimation(): void
  lastFrameTimestamp: number
  stopAnimation(): void
  runAnimation(): void
  resetAnimation(): void
  changeToRollStart(): void
  changeToRolLResult(tier: any): void
  changeColorTier(tier: any): void
  displayMultiTierEndResult(tiers: any): void
}
declare class StoreRollInnerAnimationController extends AnimationController {
  constructor(startColorTier: any)
  updateColorTier(tier: any): void
  updateMultiColorTiers(tiers: any): void
  toggleRollSpeed(on: any): void
  TIER_STATIC_COLORS: {
    1: RGB
    2: RGB
    3: RGB
    4: RGB
  }
  TIER_DYNAMIC_COLORS: {
    1: RGB
    2: RGB
    3: RGB
    4: RGB
  }
  ROLL_SPEED_PERCENT: number
}
declare class StoreInnerAnimationCanvas extends AnimationCanvasCenter {}
declare class StoreRollOuterAnimationController extends AnimationController {
  constructor(startColorTier: any)
  centerCircleShape: AnimationShapeCircle
  spawnDonutShape: AnimationShapeDonut
  updateColorTier(tier: any): void
  updateMultiColorTiers(tiers: any): void
  toggleRollSpeed(on: any): void
  toggleReverseDirection(on: any): void
  TIER_COLORS: {
    1: RGB
    2: RGB
    3: RGB
    4: RGB
  }
  ROLL_SPEED_PERCENT: number
}
declare class StoreOuterStaticAnimationCanvas extends AnimationCanvasCenter {
  constructor($canvas: any, $rewardCenter: any)
  $rewardCenter: any
}
declare class StoreOuterDynamicAnimationCanvas extends AnimationCanvasCenter {
  constructor($canvas: any, $rewardCenter: any, targetCircleShape: any, spawnDonutShape: any)
  $rewardCenter: any
  targetCircleShape: any
  spawnDonutShape: any
}
declare class StoreOuterRewardContainer {
  constructor($container: any)
  $container: any
  $nameContainer: any
  $name: any
  $avatarImage: any
  $backgroundImage: any
  $ticketIcon: any
  $typeText: any
  $rhythmIcon: any
  rhythmReward: number
  get maxWidth(): number
  get maxHeight(): any
  set avatar(arg: any)
  set emote(arg: any)
  set ticketImageTier(arg: any)
  animationDone(): void
  setupResult(result: any): void
  resize(): void
  updateTextSize(): void
  toggleActive(on: any): void
  displayResult(tier: any): void
  reset(): void
  RIGHT_MARGIN_PERCENT: number
  TIER_COLORS: {
    1: RGB
    2: RGB
    3: RGB
    4: RGB
  }
  SIZE_MOD_SIZES: {
    0: string
    20: string
    51: string
  }
}
declare class StoreOuterMajorRewardContainer extends StoreOuterRewardContainer {
  get maxWidth(): any
}
declare class StoreInsdeRewardContainer extends StoreOuterRewardContainer {}
