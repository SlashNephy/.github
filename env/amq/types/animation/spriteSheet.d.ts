declare class SpriteSheet {
  constructor(sheetBufferedImage: any, spriteSize: any, colCount: any, rowCount: any)
  frames: SpriteSheetFrame[]
  cachedLoaded: boolean
  get loaded(): boolean
  get frameCount(): number
  getFrame(frameNumber: any): SpriteSheetFrame
}
declare class SpriteSheetFrame {
  constructor(bufferedImage: any, spriteSize: any, col: any, row: any)
  $canvas: JQuery<HTMLElement>
  canvas: HTMLElement
  ctx: any
  frameReady: boolean
  loadImage(image: any, spriteSize: any, col: any, row: any): void
}
