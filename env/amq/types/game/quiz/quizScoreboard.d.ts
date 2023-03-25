declare class QuizScoreboard {
  $container: JQuery<HTMLElement>
  _$animeCenterContainer: JQuery<HTMLElement>
  $quizScoreboardItemContainer: JQuery<HTMLElement>
  $quizScoreboardEntryContainer: JQuery<HTMLElement>
  $qpStandingCorrectCount: JQuery<HTMLElement>
  groups: {}
  playerEntries: {}
  scoreType: any
  teamMap: {}
  idsToRemove: any[]
  activeGroup: any
  showCorrect: boolean
  updateLayout(groupMap: any): void
  reset(): void
  setScoreType(scoreType: any): void
  setupGroups(groupMap: any): void
  resetupGroups(groupMap: any): void
  setActiveGroup(groupNumber: any): void
  setupPlayers(players: any, lives: any): void
  setupLatePlayers(newPlayers: any, playerCount: any): void
  setupPlayersWithScore(players: any): void
  addPlayerToTeam(entry: any, teamNumber: any): void
  updateStandings(players: any, groupMap: any): void
  updateEntryLayout(): void
  updateGroupLayout(groupMap: any): void
  scrollToGroup(groupNumber: any): void
  getScoreTitle(): 'Lives' | 'Points'
  disableEntry(gamePlayerId: any): void
  enableEntry(gamePlayerId: any): void
  resetCorrect(): void
  showCorrectCount(count: any): void
  setEntryHidden(gamePlayerId: any): void
  removeEntry(gamePlayerId: any): void
  SCOREBOARD_BOTTOM_MARGIN: number
  SCOREBOARD_TITLE_HEIGHT: number
  PLAYER_NEEDED_FOR_SHOWING_CORRECT: number
}
