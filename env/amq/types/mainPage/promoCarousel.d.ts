declare function PromoCarousel(): void
declare class PromoCarousel {
  $PROMO_CONTAINER: JQuery<HTMLElement>
  $CYCLE_CONTAINER: JQuery<HTMLElement>
  promoList: any[]
  currentIndex: number
  LOOP_SPEED: number
  setup(): void
  initCarousel(): void
  resetLoop(): void
  interval: NodeJS.Timer
  step(): void
  stepTo(index: any): void
  createCycleEntry(index: any): JQuery<HTMLElement>
}
declare var promoCarousel: PromoCarousel
