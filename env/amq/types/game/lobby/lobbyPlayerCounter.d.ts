declare class LobbyPlayerCounter {
  $topCount: JQuery<HTMLElement>
  $bottomCount: JQuery<HTMLElement>
  $centerCount: JQuery<HTMLElement>
  $load: JQuery<HTMLElement>
  $readyLoad: JQuery<HTMLElement>
  countMode: boolean
  toggleCountMode(on: any): void
  updateCount(max: any, current: any): void
  updateReadyCount(max: any, current: any): void
}
