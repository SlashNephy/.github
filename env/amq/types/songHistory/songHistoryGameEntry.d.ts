declare class SongHistoryGameEntry {
  constructor(
    {
      quizId,
      startTime,
      roomName,
    }: {
      quizId: any
      startTime: any
      roomName: any
    },
    songLoad?: boolean,
    displayOnSong?: boolean
  )
  quizId: any
  startTime: any
  roomName: any
  songLoad: boolean
  displayOnSong: boolean
  $body: JQuery<any>
  $loadButton: JQuery<HTMLElement>
  $loadButtonText: JQuery<HTMLElement>
  $loadButtonLoadIcon: JQuery<HTMLElement>
  $songContainer: JQuery<HTMLElement>
  $downloadButton: JQuery<HTMLElement>
  songTable: SongHistoryTable
  get downloadJsonString(): string
  addSong(row: any): void
  triggerSongLoad(): void
  loadSongs(songInfoList: any): void
  switchToSongTable(): void
  handleColumnChange(activeColumns: any): void
  handleTargetNameChange(useRomanjiNames: any): void
  handleTargetListIdChange(targetListId: any): void
  TEMPLATE: string
}
