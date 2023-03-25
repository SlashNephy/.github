declare class DomElement {
  constructor($element: any, onClick: any)
  $element: any
  show(): void
  hide(): void
  disable(): void
  enable(): void
}
declare class AnimationElement {
  constructor(ctx: any, x: any, y: any, rgbColor: any)
  ctx: any
  x: any
  y: any
  _color: any
  get color(): any
  draw(): void
  updateColor(rgbColor: any): void
}
declare class AnimationRendorElement extends AnimationElement {
  constructor(ctx: any, x: any, y: any, rgbColor: any, canvasWidth: any, canvasHeight: any)
  $renderCanvas: JQuery<HTMLElement>
  canvasWidth: any
  canvasHeight: any
  renderCanvas: AnimationCanvasCenter
  render(): void
}
declare class AnimationImageElement {
  constructor(ctx: any, x: any, y: any, imageCanvas: any)
  ctx: any
  x: any
  y: any
  imageCanvas: any
  draw(): void
}
declare class BubleImageElement extends AnimationImageElement {
  constructor(
    ctx: any,
    x: any,
    y: any,
    imageCanvas: any,
    horiAcc: any,
    horiChangeChance: any,
    maxHori: any,
    vertSpeed: any,
    vertGoal: any,
    vertGoalCallback: any,
    vertOpacityTrigger: any,
    opacityDropRate: any
  )
  horiAcc: any
  maxHori: any
  vertSpeed: any
  vertGoal: any
  vertGoalCallback: any
  horiSpeed: number
  horiDirection: number
  horiDirectionChangeChance: any
  opacity: number
  vertOpacityTrigger: any
  opacityDropRate: any
  draw(deltaTimeSeconds: any): void
}
declare class RandomBubleImageElement extends BubleImageElement {
  constructor(
    ctx: any,
    x: any,
    y: any,
    imageCanvas: any,
    horiAccMin: any,
    hoiiAccMax: any,
    horiChangeChanceMin: any,
    horiChangeChanceMax: any,
    maxHoriMin: any,
    maxHoriMax: any,
    vertSpeedMin: any,
    vertSpeedmax: any,
    vertGoal: any,
    vertGoalCallback: any,
    vertOpacityTrigger: any,
    opacityDropRate: any
  )
}
declare class StaticDonut extends AnimationElement {
  constructor(ctx: any, x: any, y: any, containerRadius: any, radiusPercent: any, clearPercent: any, rgbColor: any)
  radiusPercent: any
  clearPercent: any
  set containerRadius(arg: any)
  targetRadius: number
  targetClearRadius: number
}
declare class StaticGlowOrb extends AnimationElement {
  constructor(
    ctx: any,
    x: any,
    y: any,
    radius: any,
    glowRangePercent: any,
    glowFadeStartPercent: any,
    glowFadeEndPercent: any,
    rgbColor: any
  )
  baseRadius: any
  glowRangePercent: any
  glowFadeStartPercent: any
  glowFadeEndPercent: any
  centerGolor: RGB
  glowColor: any
  fadeStartColor: any
  fadeEndColor: any
}
declare class RotatingCircleSlice extends AnimationElement {
  constructor(
    ctx: any,
    x: any,
    y: any,
    startAngel: any,
    containerRadius: any,
    radiusPercent: any,
    angle: any,
    speed: any,
    rgbColor: any
  )
  currentAngle: any
  angle: any
  speed: any
  bonusSpeed: number
  _targetBonusSpeed: number
  oldBonusSpeed: number
  acceleration: number
  radiusPercent: any
  set containerRadius(arg: any)
  set targetBonusSpeed(arg: number)
  get targetBonusSpeed(): number
  targetRadius: number
  draw(deltaTimeSeconds: any): void
  DEFAULT_ACCELERATION_PERCENT: number
}
declare class AnimationParticle extends StaticGlowOrb {
  constructor(
    ctx: any,
    x: any,
    y: any,
    radius: any,
    glowRangePercent: any,
    glowFadeStartPercent: any,
    glowFadeEndPercent: any,
    rgbColor: any,
    speed: any,
    targetShape: any
  )
  speed: any
  bonusSpeed: number
  _targetBonusSpeed: number
  oldBonusSpeed: number
  acceleration: number
  targetShape: any
  _revereDirection: boolean
  currentFade: number
  fadeOut: boolean
  set targetBonusSpeed(arg: number)
  get targetBonusSpeed(): number
  get velucityX(): number
  get velucityY(): number
  set reverseDirection(arg: boolean)
  get reverseDirection(): boolean
  movedDistance: any
  calculateVelucity(): void
  normVector: any
  targetDistance: number
  targetReached(): void
  draw(deltaTimeSeconds: any): void
  DEFAULT_ACCELERATION_PERCENT: number
}
declare class AnimationRandomParticle extends AnimationParticle {
  constructor(
    ctx: any,
    glowRangePercent: any,
    glowFadeStartPercent: any,
    glowFadeEndPercent: any,
    rgbColor: any,
    targetShape: any,
    spawnShape: any,
    minSpeed: any,
    maxSpeed: any,
    minRadius: any,
    maxRadius: any
  )
  spawnShape: any
  minSpeed: any
  maxSpeed: any
  minRadius: any
  maxRadius: any
  randomize(spawnMoving: any): void
  fadeDistance: number
  nextTargetShape: any
}
