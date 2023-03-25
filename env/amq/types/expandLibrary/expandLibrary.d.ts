declare function ExpandLibrary(): void
declare class ExpandLibrary {
  $view: JQuery<HTMLElement>
  $counterContainer: JQuery<HTMLElement>
  $counter: JQuery<HTMLElement>
  open: boolean
  particleAnimation: ParticleAnimation
  particleTrack: ParticleTrack
  _newAnswerListener: Listener
  _answerResultListener: Listener
  setup(expandCount: any): void
  questionListHandler: ExpandQuestionList
  questionBox: ExpandQuestionBox
  runXPAnimation(xpInfo: any, level: any, credits: any, tickets: any): void
  closeView(): void
  openView(callback: any): void
  songOpened(songEntry: any): void
  selectedSong: any
  songClosed(): void
  submitAnswer(url: any, resolution: any): void
}
declare var expandLibrary: ExpandLibrary
