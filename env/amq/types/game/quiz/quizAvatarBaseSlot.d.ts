declare class QuizAvatarSlotBase {
  constructor(
    template: any,
    name: any,
    level: any,
    points: any,
    avatarDisabled: any,
    poseIdMap: any,
    flipDamageSprite: any
  )
  $body: JQuery<any>
  $innerContainer: JQuery<HTMLElement>
  $bottomContainer: JQuery<HTMLElement>
  $nameContainer: JQuery<HTMLElement>
  $levelContainer: JQuery<HTMLElement>
  $pointContainer: JQuery<HTMLElement>
  $avatarImage: JQuery<HTMLElement>
  $avatarImageContainer: JQuery<HTMLElement>
  $imageContainer: JQuery<HTMLElement>
  $targetIconContainer: JQuery<HTMLElement>
  $swapIconContainer: JQuery<HTMLElement>
  $hpBar: JQuery<HTMLElement>
  $shieldBar: JQuery<HTMLElement>
  $buffContainer: JQuery<HTMLElement>
  $buffContainerInner: JQuery<HTMLElement>
  $overlayImg: JQuery<HTMLElement>
  $iconFlashImg: JQuery<HTMLElement>
  $iconObjectContainer: JQuery<HTMLElement>
  $hitCanvas: JQuery<HTMLElement>
  $damageBubleContainer: JQuery<HTMLElement>
  $shieldAmount: JQuery<HTMLElement>
  $nexusTargetButton: JQuery<HTMLElement>
  $nexusTargetButtonText: JQuery<HTMLElement>
  hitCanvasCtx: any
  flashImg: QuizAvatarSlotFlashImage
  poseIdMap: any
  currentBuffSize: number
  avatarSizeMod: any
  set name(arg: any)
  get name(): any
  set level(arg: any)
  set points(arg: any)
  flipDamageSprite: any
  displayed: boolean
  set disabled(arg: any)
  get disabled(): any
  cloneImageTarget: any
  poseImages: {}
  get allPoseImages(): any[]
  setupAvatar(): void
  addTargetIcon(icon: any): void
  addSwapIcon(icon: any): void
  loadPoses(): void
  updatePose(): void
  getPoseImage(targetPose: any, disabled: any): any
  updateSpriteCanvasPosition(): void
  updateSize(maxWidth: any, maxHeight: any): void
  currentMaxWidth: any
  currentMaxHeight: any
  updateTargetButtonTextSize(): void
  updateBuffContainerSize(): void
  buffsLargerThanContainer(): boolean
  resizeBuffs(): void
  resetBuffSize(): void
  addBuff($buff: any): void
  buffRemoved(): void
  remove(): void
  hide(): void
  show(): void
  displayDamage(
    newHp: any,
    newShield: any,
    hpChangeText: any,
    maxHealth: any,
    damageClasses: any,
    attackEffectSet: any,
    finishedCallback: any
  ): void
  triggerHealthUpdate(newHp: any, newShield: any, hpChangeText: any, maxHealth: any, damageClasses: any): void
  playForcedSfx(sfx: any, sfxTimeingMs: any, callback: any): void
  playSfx(sfx: any): void
  playDamageSprite(sprite: any, hitEffect: any, finishedCallback: any): void
  updateHealth(newHp: any, hpChangeText: any, maxHealth: any, damageClasses: any): void
  set hpBarPercent(arg: any)
  updateShield(newShield: any, maxHealth: any): void
  set shieldBarPercent(arg: any)
  set shieldAmount(arg: any)
  displayOverlay(src: any, srcset: any): void
  clearOverlay(): void
  displayFlashIcon(iconSrc: any, iconSrcset: any, callback: any, $targetImage: any): void
  getEffectClassFromHitEffectId(
    hitEffectId: any
  ): 'qpAvatarDamagePushOneWay' | 'qpAvatarDamageShake' | 'qpAvatarDamagePush'
  setCloneEffect(cloneSlot: any): void
  removeCloneEffect(): void
  _name: any
  _disabled: any
  set zIndex(arg: any)
  set pose(arg: any)
  _pose: any
  get sizeModClass(): string
  get sizeModValue(): any
  IMAGE_SIZE_MOD_SIZES: {
    0: string
    20: string
    51: string
    80: string
  }
  INFO_CONTAINER_HEIGHT: number
  INNER_OUTER_CONTAINER_WIDTH_RATIO: number
  DAMAGE_BUBLE_TEMPLATE: string
  MAX_HORI_DAMAGE_BUBLE_OFFSET: number
  MIN_HORI_DAMAGE_BUBLE_OFFSET: number
  BOTTOM_BAR_SIZE: number
  BUFF_MAX_SIZE: number
  BUFF_MIN_SIZE: number
  BUFF_SIZE_STEPS: number
  BUFF_SIZE_GRACE: number
}
declare class QuizAvatarPoseImageBase {
  constructor(avatarInfo: any, pose: any, imageVh: any)
  avatarInfo: any
  pose: any
  imageVh: any
  loaded: boolean
  get srcset(): void
  get src(): void
  load(callback: any): void
  image: HTMLImageElement
}
declare class QuizAvatarSlotFlashImage {
  constructor($img: any, $objectContainer: any)
  $img: any
  $objectContainer: any
  active: boolean
  fadingIn: boolean
  flashImage(src: any, srcset: any, callback: any, $targetImage: any): void
  callback: any
  stuckTimeout: NodeJS.Timeout
  STUCK_TIMEOUT_TIME: number
}
