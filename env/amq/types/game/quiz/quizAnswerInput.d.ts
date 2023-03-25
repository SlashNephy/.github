declare class QuizAnswerInput {
  constructor(skipController: any)
  typingInput: QuizTypeAnswerInput
  multipleChoice: QuizMultipleChoiceAnswerController
  get activeInputController(): QuizTypeAnswerInput | QuizMultipleChoiceAnswerController
  set inFocus(arg: boolean)
  get inFocus(): boolean
  set active(arg: any)
  set gotTeamAnswer(arg: any)
  updateMode(multipleChoiceActive: any): void
  displayAnswer(answer: any): void
  setNewAnswer(answer: any): void
  submitAnswer(showState: any): void
  showSubmitedAnswer(): void
  handleGuessPhaseOver(): void
  disable(): void
  enable(): void
  clear(): void
  resetAnswerState(): void
  updateAutocomplete(): void
  setMultipleChoiceNames(names: any): void
  setCorrectGuess(correctGuess: any): void
}
declare class QuizTypeAnswerInputController {
  constructor($container: any, skipController: any)
  $container: any
  skipController: any
  displayed: boolean
  _inFocus: boolean
  gotTeamAnswer: boolean
  show(): void
  hide(): void
  set inFocus(arg: boolean)
  get inFocus(): boolean
  set active(arg: any)
  get autoSubmitEligible(): boolean
  displayAnswer(): void
  setNewAnswer(): void
  submitAnswer(answer: any): void
  handleGuessPhaseOver(): void
  disable(): void
  enable(): void
  clear(): void
  resetAnswerState(): void
}
declare class QuizTypeAnswerInput extends QuizTypeAnswerInputController {
  constructor(skipController: any)
  $input: JQuery<HTMLElement>
  quizAnswerState: QuizAnswerState
  autoCompleteController: AutoCompleteController
  displayAnswer(answer: any): void
  setNewAnswer(answer: any): void
  showSubmitedAnswer(): void
  updateAutocomplete(): void
}
declare class QuizMultipleChoiceAnswerController extends QuizTypeAnswerInputController {
  constructor(skipController: any)
  answerSubmitted: boolean
  answerOptions: QuizMultipleChoiceAnswerOption[]
  answerListener: Listener
  get currentSelectedOption(): QuizMultipleChoiceAnswerOption
  handleClick(option: any): void
  findOptionWithName(name: any): QuizMultipleChoiceAnswerOption
  displayAnswer(answer: any): void
  setNewAnswer(answer: any): void
  submitAnswer(): void
  setNames(names: any): void
  setCorrectGuess(correctGuess: any): void
}
declare class QuizMultipleChoiceAnswerOption {
  constructor($body: any, clickHandler: any)
  $body: any
  $textContainer: any
  $text: any
  currentName: string
  altName: string
  selected: boolean
  disabled: boolean
  setName(name: any): void
  setPopoverName(main: any, alt: any): void
  resetName(): void
  reset(): void
  clearSelected(): void
  setSelected(): void
  setRegistered(): void
  setCorrectGuess(correctGuess: any): void
  disable(): void
  enable(): void
}
