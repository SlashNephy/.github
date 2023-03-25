declare class EmoteBubler {
  canvas: AnimationCanvas
  aniamtionController: SimpleAnimationController
  emoteImageCatch: {}
  emojiImageCatch: {}
  shortCodeCatch: {}
  newBubbleEventList(bubbleEvents: any): void
  spawnBubbleGroup(group: any): void
  newBubles(emoteIds: any, shortCodes: any, customEmojiIds: any): void
  insertEmoteBuble(emoteId: any): void
  insertEmojiBuble(emojiId: any): void
  insertShortCodeBuble(shortCode: any): void
  createNewBuble(imageCanvas: any): void
  createOffscrenImageCanvas(img: any, size: any): HTMLElement
  removeBuble(element: any): void
  resize(): void
  SPAWN_MARGIN_SIZE: number
  MIN_HORI_ACC: number
  MAX_HORI_ACC: number
  MIN_HORI_CHANGE_CHANCE: number
  MAX_HORI_CHANGE_CHANCE: number
  MIN_MAX_HORI: number
  MAX_MAX_HORI: number
  MIN_VERT: number
  MAX_VERT: number
  IMAGE_SIZE: number
  FADE_OUT_START_PERCENT: number
  FADE_OUT_RATE: number
  MAX_GROUP_SIZE: number
  GROUP_SPAWN_SPEED: number
}
