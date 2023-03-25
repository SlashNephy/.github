declare class SongHistoryTab {
  constructor($tab: any, tabSwitchHandler: any, $tableContainer: any, $noSongMessage: any, $optionContainer: any)
  $tab: any
  $tableContainer: any
  $noSongMessage: any
  $optionContainer: any
  selected: boolean
  selectTab(): void
  deselectTab(): void
  displayTable(): void
}
declare class SongHistoryGameTab extends SongHistoryTab {
  table: SongHistoryTable
  addSongRow(row: any): void
  addSongRows(rows: any): void
  clearSongRows(): void
  getSongRows(): any[]
  display(): void
  displayNoSongsMessage(): void
  handleColumnChange(activeColumns: any): void
  handleTargetNameChange(useRomanjiNames: any): void
  handleTargetListIdChange(targetListId: any): void
}
declare class SongHistoryGamesTab extends SongHistoryTab {
  $outerContainer: JQuery<HTMLElement>
  $gameContainer: JQuery<HTMLElement>
  gameMap: {}
  loadHistorySongsListener: Listener
  display(): void
  setupGames(games: any): void
  quizJoined(quizDescription: any, activeColumns: any): void
  addSongRow(songRow: any, quizDescription: any): void
  handleColumnChange(activeColumns: any): void
  handleTargetNameChange(useRomanjiNames: any): void
  handleTargetListIdChange(targetListId: any): void
  GAME_CONTAINER_OUTER_HTML: string
  GAME_CONTAINER_INNER_HTML: string
}
declare class SongHistoryOptionTab extends SongHistoryTab {
  constructor(
    $tab: any,
    tabSwitchHandler: any,
    $tableContainer: any,
    $noSongMessage: any,
    $optionContainer: any,
    columnChangeHandler: any,
    nameTargetChangeHandler: any,
    listTargetChangeHandler: any
  )
  $showNamesSlider: any
  $animeListSlider: any
  $animeColumnOption: any
  $annIdColumnOption: any
  $typeColumnOption: any
  $nameColumnOption: any
  $artistColumnOption: any
  $answerColumnOption: any
  $guessesColumnOption: any
  $sampleColumnOption: any
  get activeColumns(): {
    anime: any
    annId: any
    type: any
    name: any
    artist: any
    answer: any
    guesses: any
    sample: any
  }
  get useRomanjiNames(): any
  get targetListId(): any
  updateSettings(settings: any): void
  display(): void
}
