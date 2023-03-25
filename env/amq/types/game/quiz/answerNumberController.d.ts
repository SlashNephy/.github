declare class AnswerNumberController {
  constructor($answerContainer: any)
  $textContainer: any
  $answerNumber: any
  $answerContainer: any
  shown: boolean
  showResult(number: any, correct: any): void
  showUnknown(number: any): void
  show(): void
  hide(): void
}
