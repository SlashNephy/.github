declare class SongHistoryWindow extends DragWindow {
  constructor()
  $tableContainer: JQuery<HTMLElement>
  $noSongMessage: JQuery<HTMLElement>
  $optionContainer: JQuery<HTMLElement>
  $tabs: JQuery<HTMLElement>
  currentGameTab: SongHistoryGameTab
  lastGameTab: SongHistoryGameTab
  gamesTab: SongHistoryGamesTab
  optionTab: SongHistoryOptionTab
  tabs: (SongHistoryOptionTab | SongHistoryGameTab | SongHistoryGamesTab)[]
  setup(songHistorySettings: any, quizHistory: any): void
  clearTabs(): void
  handleColumnChange(activeColumns: any): void
  handleTargetNameChange(useRomanjiNames: any): void
  handleDefaultNameTargetChanged(): void
  handleTargetListIdChange(targetListId: any): void
  handleDefaultListTargetChanged(): void
  addNewSong(songHistoryInfo: any, quizDescription: any): void
  quizFinished(): void
  quizJoined(quizDescription: any): void
}
declare var songHistoryWindow: SongHistoryWindow
declare class SongHistoryRow {
  constructor(songHistoryInfo: any, useRomanjiNames: any, targetListId: any)
  songInfo: any
  useRomanjiNames: any
  targetListId: any
  $body: JQuery<any>
  $headerNumber: JQuery<HTMLElement>
  $headerAnime: JQuery<HTMLElement>
  $headerAnnId: JQuery<HTMLElement>
  $headerType: JQuery<HTMLElement>
  $headerName: JQuery<HTMLElement>
  $headerArtist: JQuery<HTMLElement>
  $headerAnswer: JQuery<HTMLElement>
  $headerGuesses: JQuery<HTMLElement>
  $headerSample: JQuery<HTMLElement>
  $animeName: JQuery<HTMLElement>
  exportJsonObject: any
  get animeUrl(): string
  get annUrl(): string
  get annId(): any
  get animeName(): any
  get typeDescription(): string
  get songName(): any
  get artist(): any
  setActiveColumns(activeColumns: any): void
  toggleColumn($column: any, active: any): void
  updateTargetName(useRomanjiNames: any): void
  updateTargetListId(targetListId: any): void
  TEMPLATE: string
}
