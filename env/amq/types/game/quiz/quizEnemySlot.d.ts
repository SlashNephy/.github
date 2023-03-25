declare class QuizEnemySlot extends QuizAvatarSlotBase {
  constructor(enemyInfo: any, hp: any, position: any)
  $targetImage: JQuery<HTMLElement>
  $counterContainer: JQuery<HTMLElement>
  setupAvatar(avatar: any): void
  updateTarget(src: any, srcset: any): void
  clearTarget(): void
  setGotTarget(gotTarget: any): void
  ENEMY_TEMPLATE: string
  SPRITE_CANVAS_POSITION_CHANGE_X: number
  SPRITE_CANVAS_POSITION_CHANGE_Y: number
  SPRITE_CANVAS_POSITION_Y_DEFAULT: number
}
declare class QuizEnemyPoseImage extends QuizAvatarPoseImageBase {
  get srcset(): string
  get src(): string
}
