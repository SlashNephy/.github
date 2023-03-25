declare class Lobby {
  $view: JQuery<HTMLElement>
  $roomName: JQuery<HTMLElement>
  $roomId: JQuery<HTMLElement>
  $ruleButton: JQuery<HTMLElement>
  $shuffleTeamButton: JQuery<HTMLElement>
  players: {}
  inLobby: boolean
  soloMode: boolean
  ownGamePlayerId: any
  lobbyAvatarContainer: LobbyAvatarContainer
  mainButton: LobbyMainButton
  playerCounter: LobbyPlayerCounter
  ruleModal: LobbyRuleModal
  inputModeSelector: LobbyInputModeSelector
  $battleRoyalRuleModal: JQuery<HTMLElement>
  $lastManRuleModal: JQuery<HTMLElement>
  $rankedRuleModal: JQuery<HTMLElement>
  _settingListener: Listener
  _newPlayerListner: Listener
  _playerLeaveListner: Listener
  _spectatorChangeToPlayer: Listener
  _readyChangeListner: Listener
  _gameStartListner: Listener
  _forceSpectatorListner: Listener
  _avatarChangeListener: Listener
  _hostPromotionListner: Listener
  _gameClosedListner: Listener
  _spectatorLeftListener: Listener
  _nameChangeListner: Listener
  _spectatorNameChangeListner: Listener
  _joinTeamListener: Listener
  _shuffleTeamsListener: Listener
  _playerAnswerModeChangeListener: Listener
  get isHost(): boolean
  get numberOfPlayers(): number
  get numberOfPlayersReady(): number
  openView(callback: any): void
  closeView(args: any): void
  setupLobby(lobbyInfo: any, isSpectator: any): void
  isSpectator: any
  isReady: any
  gameId: any
  hostName: any
  closeTime: any
  blockJoinMessage: any
  numberOfTeams: any
  settings: any
  displayJoinLeaveMessages: boolean
  updatePlayerCounter(): void
  addPlayer(player: any, teamFullMap: any): LobbyPlayer
  removePlayer(gamePlayerId: any): void
  kickPlayer(playerName: any): void
  viewSettings(): void
  changeGameSettings(): void
  changeToSpectator(playerName: any): void
  promoteHost(playerName: any): void
  fireMainButtonEvent(dueStartTrigger: any): void
  setNewHost(newHostName: any): void
  getPlayerByName(playerName: any): any
  toggleRuleButton(settingChanges: any): void
  checkAutoDisplayRuleModal(settingChanges: any): void
  showRules(): void
  shuffleTeams(): void
  updateMainButton(): void
  get canJoin(): boolean
  get joinBlockedMessage(): any
  leave(args: any): void
  setPlayerTeam(gamePlayerId: any, teamNumber: any): void
  RULE_DESCRIPED_GAME_MODES: string[]
  ANSWERING_MODES: {
    TYPING: number
    MIXED: number
    MULTIPLE_CHOICE: number
  }
}
declare class LobbyMainButton {
  $mainButton: JQuery<HTMLElement>
  $duoMainButton: JQuery<HTMLElement>
  $dueJoinButotn: JQuery<HTMLElement>
  $dueStartButotn: JQuery<HTMLElement>
  $rankedMainButton: JQuery<HTMLElement>
  $rankedButtonText: JQuery<HTMLHeadingElement>
  $rankedTimerText: JQuery<HTMLHeadingElement>
  inDueMode: boolean
  toggleMainButton(): void
  toggleSplitButton(): void
  toggleRankedButton(closeTimeString: any): void
  rankedTargetTime: any
  rankedUpdateInterval: NodeJS.Timer
  hideAll(): void
  updateRankedTimer(): void
  updateDueJoinButton(text: any, active: any, disableMessage: any): void
  dueJoinActive: any
  updateDueStartButton(text: any, active: any, disableMessage: any): void
  dueStartActive: any
  updateMainButton(text: any, active: any, disableMessage: any): void
  active: any
  _toggleButton(text: any, active: any, disableMessage: any, button: any): void
}
declare let lobby: Lobby
