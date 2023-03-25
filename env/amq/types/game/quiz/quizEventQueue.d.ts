declare class QuizEventQueue {
  constructor(quiz: any)
  quiz: any
  queue: any[]
  currentEvents: any[]
  finishedEventCount: number
  running: boolean
  reset(): void
  addEvent(events: any, skipDelay: any): void
  startQueue(): void
  tickNextEvents(): void
  TICK_DELAY: number
}
