declare class LifeCounterController {
  constructor($avatar: any, maxLives: any, currentLives: any)
  $container: any
  maxLives: any
  currentLives: any
  lifeMap: {
    1: any
    2: any
    3: any
    4: any
    5: any
  }
  setupLives(currentLives: any, revivePoints: any): void
  updateState(newLifeCount: any, newReviveScore: any): void
  activateLife(number: any): void
  killLife(number: any): void
  activateCharge(number: any): void
  killChage(number: any): void
  showReviveTarget(): void
  runReviewAnimation(): void
  resize(): void
}
