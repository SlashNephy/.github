declare class SpriteSheetBuffer {
  spriteSheets: {}
  get maxSize(): number
  loadSheet(name: any, targetSize: any): void
  loadAttackVFXSheet(name: any): void
  getSpriteSheet(name: any, targetSize: any): any
  getSizeFromTargetSize(targetSize: any): number
  SPRITE_SIZES: number[]
  SPRITE_SHEET_ROW_COUNT: number
  SPRITE_SHEET_COL_COUNT: number
  BUFFER_CATEGORY: string
}
declare var spriteSheetBuffer: SpriteSheetBuffer
