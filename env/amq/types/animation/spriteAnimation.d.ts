declare class SpriteAnimation {
  constructor(
    canvas: any,
    spriteName: any,
    flipSprite?: boolean,
    scale?: number,
    randomOffset?: boolean,
    speed?: number
  )
  canvas: any
  speed: number
  flipSprite: boolean
  spriteSheet: any
  offsetX: number
  offsetY: number
  currentFrameNumber: number
  animationRunning: boolean
  get canvasWidth(): any
  get canvasHeight(): any
  get spriteFrameCount(): any
  drawCurrentFrame(): void
  startAnimation(finishCallback: any): boolean
  finishCallback: any
  animationStartTimestamp: number
  tickAnimation(): void
  FPS: number
}
