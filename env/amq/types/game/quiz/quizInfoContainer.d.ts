declare function QuizInfoContainer(): void
declare class QuizInfoContainer {
  $name: JQuery<HTMLElement>
  $nameContainer: JQuery<HTMLElement>
  $nameHider: JQuery<HTMLElement>
  $currentSongCount: JQuery<HTMLElement>
  $totalSongCount: JQuery<HTMLElement>
  $extraAnimeSongInfo: JQuery<HTMLElement>
  $songName: JQuery<HTMLElement>
  $songArtist: JQuery<HTMLElement>
  $songType: JQuery<HTMLElement>
  $songVideoLink: JQuery<HTMLElement>
  $songAnimeLink: JQuery<HTMLElement>
  $infoHider: JQuery<HTMLElement>
  $rateContainers: JQuery<HTMLElement>
  $upvoteContainer: JQuery<HTMLElement>
  $downvoteContainer: JQuery<HTMLElement>
  $reportContainer: JQuery<HTMLElement>
  $reportFeedbackContainer: JQuery<HTMLElement>
  $reportFeedbackInput: JQuery<HTMLElement>
  $adminReportCheckbox: JQuery<HTMLElement>
  $songInfoLinkRow: JQuery<HTMLElement>
  REPORT_AUTO_REASONS: string[]
  currentSongNumber: number
  reportAwesomeplete: AmqAwesomeplete
  reportSelected: boolean
  likeSelected: boolean
  dislikeSelected: boolean
  FEEDBACK_TYPE: {
    NONE: number
    LIKE: number
    DISLIKE: number
    REPORT: number
  }
  $extraAnimeNameContent: string
  $extraAnimeContent: string
  showInfo(
    animeNames: any,
    songName: any,
    artist: any,
    type: any,
    typeNumber: any,
    urls: any,
    siteIds: any,
    animeScore: any,
    animeType: any,
    vintage: any,
    animeDifficulty: any,
    animeTags: any,
    animeGenre: any,
    altAnimeNames: any,
    altAnimeNamesAnswers: any
  ): void
  displayAnimeName(name: any, altNames?: any[], altAnswers?: any[]): void
  displayInfoBoxHint({
    artist,
    songName,
    type,
    typeNumber,
    animeScore,
    animeType,
    vintage,
    animeDifficulty,
  }: {
    artist: any
    songName: any
    type: any
    typeNumber: any
    animeScore: any
    animeType: any
    vintage: any
    animeDifficulty: any
  }): void
  fitTextToContainer(): void
  showAnimeName(): void
  showContent(): void
  hideContent(): void
  setCurrentSongCount(count: any): void
  setTotalSongCount(count: any): void
  sendSongFeedback(): void
  resetFeedbackSelects(): void
  reset(): void
  upvoteSong(): void
  downvoteSong(): void
  reportSong(): void
  EXTRA_INFO_TEMPLATE: string
  EXTRA_ANIME_NAME_TEMPLATE: string
}
