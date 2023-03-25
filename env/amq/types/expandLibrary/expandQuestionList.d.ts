declare function ExpandQuestionList(): void
declare class ExpandQuestionList {
  _$questionList: JQuery<HTMLElement>
  _$openingsFilter: JQuery<HTMLElement>
  _$endingsFilter: JQuery<HTMLElement>
  _$insertsFilter: JQuery<HTMLElement>
  _$missingFilter: JQuery<HTMLElement>
  _$resolutionFilter: JQuery<HTMLElement>
  _$altHostFilter: JQuery<HTMLElement>
  _$searchBar: JQuery<HTMLElement>
  _$searchSpinner: JQuery<HTMLElement>
  _$openingsMoeFilter: JQuery<HTMLElement>
  _LIST_FILLER_HTML: string
  _filter: {
    openings: boolean
    endings: boolean
    inserts: boolean
    missing: boolean
    resolution: boolean
    altHost: boolean
  }
  _closedHostFilter: {
    openingsmoe: number
  }
  animeEntries: any[]
  _QUERY_UPDATE_CHUNK_SiZE: number
  _currentSearchId: number
  lastSearchRegex: RegExp
  topShownAnimeIndex: number
  updateQuestionList(questions: any): void
  topShownQuestionIndex: number
  toggleFilter($filterObject: any, filterName: any): void
  toggleHostFilter($filterObject: any, hostName: any): void
  applyFilter(): void
  applySearchFilter(query: any): void
  updateScrollLayout(): void
  removeAnime(annId: any): void
  removeSong(annId: any, annSongId: any): void
  isEmpty(): boolean
  setSongPending(annId: any, annSongId: any, host: any, resolution: any): void
  resetFilterLayout(): void
  clear(): void
}
declare namespace CLOSED_HOST_FILTER_STATES {
  const NOT_SET: number
  const ONLY: number
  const EXCLUDE: number
}
