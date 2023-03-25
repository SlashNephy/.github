declare class CheatTestGame {
  songEntries: any[]
  modView: boolean
  $challengeContainer: JQuery<HTMLElement>
  $selector: JQuery<HTMLElement>
  $note: JQuery<HTMLElement>
  $modContainers: JQuery<HTMLElement>
  targetJoinListener: Listener
  targetLeftListener: Listener
  gameClosedListner: Listener
  playSongListner: Listener
  newAnswerListener: Listener
  resetAnswerListener: Listener
  get $view(): any
  get answerInput(): any
  set inQuiz(arg: any)
  get inQuiz(): any
  get videoOverlay(): any
  get avatarContainer(): any
  get skipController(): any
  setup(originalQuiz: any): void
  _quizController: any
  openView(callback: any): void
  closeView(args: any): void
  setupModMode(songs: any, note: any, challengeId: any): void
  challengeId: any
  setupTargetMode(challengeId: any, player: any): void
  invitePlayer(): void
  resetAnswer(): void
  issueBan(): void
  issueNoBan(): void
  displayPlayer(player: any): void
  gamePlayer: QuizPlayer
}
declare var cheatTestGame: CheatTestGame
declare class CheatTestSongEntry {
  constructor(
    {
      songId,
      videoLink,
      songName,
      artist,
      animeNames,
      note,
      correct,
    }: {
      songId: any
      videoLink: any
      songName: any
      artist: any
      animeNames: any
      note: any
      correct: any
    },
    challengeId: any
  )
  $body: JQuery<any>
  $animeContainer: JQuery<HTMLElement>
  $note: JQuery<HTMLElement>
  songId: any
  challengeId: any
  setPlaying(playing: any): void
  TEMPLATE: string
}
