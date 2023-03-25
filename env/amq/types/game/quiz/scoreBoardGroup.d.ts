declare class ScoreBoardGroup {
  constructor(number: any)
  $group: JQuery<any>
  set active(arg: any)
  updatePosition(topOffset: any, bottomOffset: any): void
  topOffset: any
  remove(): void
  TEMPlATE: string
  OFFSET_CORRECTION: number
  FULL_HEIGHT: number
  FINAL_TEAM_GROUP_EXTENSION: number
}
