declare class QuizSkipController {
  answerInputController: QuizSkipButtonController
  videoSkipController: QuizSkipButtonController
  controllers: QuizSkipButtonController[]
  $container: JQuery<HTMLElement>
  $button: JQuery<HTMLElement>
  $voteStateText: JQuery<HTMLElement>
  _toggled: boolean
  enabled: boolean
  set highlight(arg: any)
  set toggled(arg: boolean)
  get toggled(): boolean
  set stateMessage(arg: any)
  set votePreviewMode(arg: any)
  toggle(): void
  voteSkip(): void
  sendSkipVote(): void
  autoVoteSkip(timeout: any): void
  autoVoteTimeout: NodeJS.Timeout
  reset(): void
  disable(skipTimeout: any): void
  enable(): void
  setTypingMode(): void
  setMultipleChoiceMode(): void
}
declare class QuizSkipButtonController {
  constructor($container: any)
  $container: any
  $button: any
  $voteStateText: JQuery<HTMLElement>
  set highlight(arg: any)
  set toggled(arg: any)
  set stateMessage(arg: any)
  set votePreviewMode(arg: any)
  disable(skipTimeout: any): void
  enable(): void
  show(): void
  hide(): void
}
