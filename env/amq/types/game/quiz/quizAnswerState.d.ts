declare function QuizAnswerState($input: any): void
declare class QuizAnswerState {
  constructor($input: any)
  $SENDING_CONTAINER: JQuery<HTMLElement>
  $ANSWER_CHECK: JQuery<HTMLElement>
  $OUTER_CONTAINER: JQuery<HTMLElement>
  $INNER_CONTAINER: JQuery<HTMLElement>
  $INPUT: any
  popoverContent: any
  answerListener: Listener
  startListner(): void
  stopListener(): void
  startLoad(): void
  loadingInterval: NodeJS.Timer
  stopLoad(): void
  show(): void
  hide(): void
  showCheck(): void
  hideCheck(): void
  submitAnswer(answer: any, showState: any, noLoad: any): void
  currentAnswer: any
  reset(): void
  submittedAnswer: any
  toggleFade(on: any): void
  setInputToAnswer(): void
  answerSubmited(): boolean
}
