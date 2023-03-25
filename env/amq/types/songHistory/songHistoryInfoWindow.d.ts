declare class SongHistoryInfoWindow extends DragWindow {
  constructor()
  $englishTitle: JQuery<HTMLElement>
  $romajiTitle: JQuery<HTMLElement>
  $type: JQuery<HTMLElement>
  $name: JQuery<HTMLElement>
  $artist: JQuery<HTMLElement>
  $allWorkingTitlesContainer: JQuery<HTMLElement>
  $samplePoint: JQuery<HTMLElement>
  $difficulty: JQuery<HTMLElement>
  $animeType: JQuery<HTMLElement>
  $vintage: JQuery<HTMLElement>
  $animeRating: JQuery<HTMLElement>
  $genre: JQuery<HTMLElement>
  $tags: JQuery<HTMLElement>
  $video: JQuery<HTMLElement>
  $annId: JQuery<HTMLElement>
  $mal: JQuery<HTMLElement>
  $aniList: JQuery<HTMLElement>
  $kitsu: JQuery<HTMLElement>
  $guessesStatLine: JQuery<HTMLElement>
  $guessesContainer: JQuery<HTMLElement>
  $playerListsStatLine: JQuery<HTMLElement>
  $playerLIstsContainer: JQuery<HTMLElement>
  displayInfo(songHistoryInfo: any): void
  createAnimeNameList(altAnimeNames: any, altAnimeNamesAnswers: any): any[]
  ROW_ENTRY: string
}
declare var songHistoryInfoWindow: SongHistoryInfoWindow
