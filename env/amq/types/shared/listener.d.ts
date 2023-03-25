declare function Listener(command: any, callback: any): void
declare class Listener {
  constructor(command: any, callback: any)
  command: any
  callback: any
  bound: boolean
  fire(payload: any): void
  bindListener(): void
  unbindListener(): void
}
