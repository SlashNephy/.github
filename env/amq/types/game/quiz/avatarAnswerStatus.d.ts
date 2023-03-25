declare class AvatarAnswerStatus {
  constructor($answerContainer: any)
  $statusContainer: any
  $listBar: any
  $typeText: any
  $scoreText: any
  set status(arg: any)
  set score(arg: any)
  hide(): void
  show(): void
  convertStatusToLetter(status: any): '' | 'P' | 'W' | 'C' | 'H' | 'D' | 'L'
  convertStatusToClass(status: any): '' | 'completed' | 'watching' | 'hold' | 'dropped' | 'planning' | 'looted'
}
