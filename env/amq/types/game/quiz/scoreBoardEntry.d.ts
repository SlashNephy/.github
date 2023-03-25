declare class ScoreBoardEntry {
  constructor(
    name: any,
    score: any,
    standing: any,
    guessCount: any,
    scoreTitle: any,
    scoreBoardPosition: any,
    active: any,
    teamNumber: any,
    hidden: any
  )
  $entry: JQuery<any>
  isSelf: boolean
  positionSlot: any
  currentPosition: any
  set disabled(arg: any)
  teamNumber: any
  $scoreBoardEntry: JQuery<HTMLElement>
  $scoreBoardEntryTextContainer: JQuery<HTMLElement>
  $guessCount: JQuery<HTMLElement>
  $score: JQuery<HTMLElement>
  $position: JQuery<HTMLElement>
  $hiddenIcon: JQuery<HTMLElement>
  set guessCount(arg: any)
  set boardPosition(arg: any)
  set score(arg: any)
  set position(arg: any)
  get positionFromTop(): number
  get height(): number
  set correct(arg: any)
  remove(): void
  updateLayout(): void
  displayHidden(): void
  TEMPLATE: string
  ENTRY_HEIGHT: number
  POSITION_RIGHT_MARGIN: number
}
