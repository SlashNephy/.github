declare class ScoreBoardTeamEntry {
  constructor(teamNumber: any)
  $body: JQuery<any>
  $playerContainer: JQuery<HTMLElement>
  entryCount: number
  teamNumber: any
  get positionFromTop(): number
  get slotSortNumber(): any
  set offset(arg: any)
  get height(): number
  addPlayerEntry(playerEntry: any): void
  playerEntrySample: any
  remove(): void
  TEMPLATE: string
}
