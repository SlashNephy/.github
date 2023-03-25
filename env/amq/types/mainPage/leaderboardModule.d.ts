declare class LeaderboardModule {
  levelLeaderboard: Leaderboard
  rankedLeaderboard: Leaderboard
  rankedRegionLists: {}
  currentRankedRegion: number
  $modal: JQuery<HTMLElement>
  _allLevelEntriesListener: Listener
  _selfLevelEntriesListener: Listener
  _topLevelEntriesListener: Listener
  _friendsLevelEntriesListener: Listener
  _rankedStandingUpdatedListener: Listener
  _rankedChampionsUpdatedListener: Listener
  show(): void
  setup(regionRankedStandings: any, regionRankedChampions: any): void
  updateRankedList(region: any, newList: any): void
  updateChampionList(region: any, newList: any): void
  initRegionEntry(region: any): void
  updateRankedEntries(): void
  setRankedRegion(region: any): void
}
declare class Leaderboard {
  constructor(tabMap: any, formatRankFunction: any, formatScoreFunction: any)
  tabMap: any
  formatRankFunction: any
  formatScoreFunction: any
  tabBoard: TabBoard
  updateList(listName: any, entries: any): void
  scrollToSelf(listName: any): void
  ENTRY_TEMPLATE: string
}
declare class TabBoard {
  constructor(tabEntries: any, onShowHandler: any)
  tabEntries: any
  clearSelected(): void
}
declare var leaderboardModule: LeaderboardModule
