declare class BaseVoteContainer {
  constructor($container: any, resultPackageName: any, resultCallback?: () => void)
  $VOTE_COTNAINER: any
  $BUTTON_CONTAINER: any
  $RESULT_TEXT: any
  $VOTE_YES_BUTTON: any
  $VOTE_NO_BUTTON: any
  timerBar: TimerBar
  _VOTE_RESULT_LISTNER: Listener
  startVote(defaultYes: any, disableVote: any, duration: any, timeAlreadyPlayed: any): void
  openVote(): void
  closeVote(): void
  reset(): void
  buttonSelected($button: any): void
  vote(): void
  showResult(resultMessage: any): void
}
