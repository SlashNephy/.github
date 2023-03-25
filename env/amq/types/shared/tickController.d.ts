declare class TickController {
  constructor(tickHandler: any, stopCheck?: () => boolean, stopHandler?: () => void)
  tickHandler: any
  stopCheck: () => boolean
  stopHandler: () => void
  running: boolean
  start(): void
  lastTickTime: number
  stop(): void
  tick(): void
}
