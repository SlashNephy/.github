declare class BubbleTextController {
  constructor($spawnRow: any)
  $spawnRow: any
  spawnText(text: any, extraClass: any): void
  generateRandomPosition(): number
  generateRandomFloatHeight(): number
  TEXT_TEMPLATE: string
  MIN_HORIZONTAL_POS: number
  HORIZONTAL_POS_RANGE: number
  MIN_FLOAT_HEIGHT: number
  FLOAT_HEIGHT_RANGE: number
}
