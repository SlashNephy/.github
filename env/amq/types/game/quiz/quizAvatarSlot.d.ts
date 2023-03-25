declare class QuizAvatarSlot extends QuizAvatarSlotBase {
  constructor(
    name: any,
    level: any,
    points: any,
    avatarInfo: any,
    isHost: any,
    avatarDisabled: any,
    lifeCountEnabled: any,
    maxLives: any,
    teamPlayer: any,
    hidden: any,
    nexusSlot: any,
    multiChoiceActive: any
  )
  $answerContainerText: JQuery<HTMLElement>
  $answerContainer: JQuery<HTMLElement>
  $hostIconContainer: JQuery<HTMLElement>
  $hiddenIconContainer: JQuery<HTMLElement>
  $abilityIconContainer: JQuery<HTMLElement>
  $backgroundContainer: JQuery<HTMLElement>
  $genreIconContainer: JQuery<HTMLElement>
  $multiChoiceIcon: JQuery<HTMLElement>
  genreIcons: {}
  set host(arg: any)
  _teamAnswerSharingOn: boolean
  answerNumberController: AnswerNumberController
  answerStatus: AvatarAnswerStatus
  lifeCounterController: LifeCounterController
  set answer(arg: any)
  get answer(): any
  _answer: any
  set answerCorrect(arg: any)
  set finalResult(arg: any)
  set unknownAnswerNumber(arg: any)
  set listStatus(arg: any)
  set listScore(arg: any)
  set teamAnswerSharingOn(arg: boolean)
  get teamAnswerSharingOn(): boolean
  showTeamAnswer(): void
  hideTeamAnswer(): void
  displayHidden(): void
  setResultAnswerNumber(number: any, correct: any): void
  setupAvatar(avatar: any): void
  setupBackground(background: any): void
  updateLifeCounter(lifeCount: any, revivePoints: any): void
  setupLifeCounterState(lives: any, revivePoints: any): void
  updateAnswerFontSize(): void
  runGroupUpAnimation(): void
  runGroupDownAnimation(): void
  showNexusTurn(): void
  hideNexusTurn(): void
  addGenreIcons(genreInfo: any): void
  hideAllGenres(): void
  showGenres(genreIds: any, seasonId: any): void
  AVATAR_TEMPALTE: string
  GROUP_CHANGE_ANIMATION_LENGTH: number
  SEASON_ID_GENRE_OFFSET: number
}
declare class QuizAvatarPoseImage extends QuizAvatarPoseImageBase {
  get srcset(): string
  get src(): string
}
declare class QuizAvatarGenreIcon {
  constructor(
    {
      name,
    }: {
      name: any
    },
    strong: any
  )
  $body: JQuery<HTMLElement>
  set active(arg: any)
  remove(): void
  TEMPLATE: string
}
