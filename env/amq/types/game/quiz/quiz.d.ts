declare class Quiz {
  $view: JQuery<HTMLElement>
  $inputContainer: JQuery<HTMLElement>
  $startReturnToLobbyButton: JQuery<HTMLElement>
  $nexusTargetLayer: JQuery<HTMLElement>
  inputFocused: boolean
  onLastSong: boolean
  settingUpFirstSong: boolean
  inQuiz: boolean
  soloMode: boolean
  isHost: boolean
  _groupSlotMap: {}
  targetingPlayerId: any
  currentAbilityTarget: any
  _noSongsListner: Listener
  _quizOverListner: Listener
  _sendFeedbackListner: Listener
  _playerLeaveListner: Listener
  _playerRejoiningListener: Listener
  _spectatorLeftListener: Listener
  _quizreadyListner: Listener
  _nextVideoInfoListener: Listener
  _playNextSongListner: Listener
  _playerAnswerListner: Listener
  _resultListner: Listener
  _endResultListner: Listener
  _waitingForBufferingListner: Listener
  _xpCreditGainListner: Listener
  _noPlayersListner: Listener
  _playerAnswerListener: Listener
  _skippingVideoListener: Listener
  _skipMessageListener: Listener
  _returnVoteStartListner: Listener
  _guessPhaseOverListner: Listener
  _errorListener: Listener
  _nameChangeListner: Listener
  _pauseTriggerListener: Listener
  _unpauseTriggerListener: Listener
  _returnVoteResultListener: Listener
  _teamMemberAnswerListener: Listener
  _modMessageFlagListener: Listener
  _messageFlagWarnedListener: Listener
  _messageFlagBanListener: Listener
  _playerHiddenListener: Listener
  _lateJoinTriggeredListener: Listener
  _playerLateJoinListener: Listener
  _nexusGameEventsListener: Listener
  _extraGuessTimeListener: Listener
  setup(): void
  videoOverlay: VideoOverlay
  infoContainer: QuizInfoContainer
  returnVoteController: ReturnVoteController
  videoTimerBar: TimerBar
  skipController: QuizSkipController
  avatarContainer: QuizAvatarContainer
  scoreboard: QuizScoreboard
  answerInput: QuizAnswerInput
  pauseButton: PauseButton
  avatarAssetHandler: QuizAvatarAssetHandler
  flaggedMessageContainer: FlaggedMessageContainer
  lateJoinButton: StandardButton
  nexusAttackOrderContainer: QuizNexusAttackOrderContainer
  eventQueue: QuizEventQueue
  openView(callback: any): void
  closeView(args: any): void
  players: {}
  setupQuiz(
    players: any,
    isSpectator: any,
    quizState: any,
    settings: any,
    isHost: any,
    groupSlotMap: any,
    soloMode: any,
    teamAnswers: any,
    selfAnswer: any,
    champGame: any,
    multipleChoice: any,
    quizDescription: any,
    enemies: any,
    avatarAssets: any
  ): void
  gameMode: any
  ownGamePlayerId: any
  teamMode: boolean
  quizDescription: any
  isSpectator: any
  champGame: any
  set groupSlotMap(arg: {})
  get groupSlotMap(): {}
  skipSettings: {
    guessing: any
    replay: any
  }
  enemyMap: {}
  avatarSlotMap: {}
  nextSongPlayLength: any
  setInputInFocus(inFocus: any): void
  skipClicked(): void
  promoteHost(newHostName: any): void
  leave(): void
  viewSettings(): void
  videoReady(songId: any): void
  startReturnLobbyVote(): void
  selectAvatarGroup(number: any): void
  handleAutoHide(type: any, watched: any, highRisk: any): void
  handlePlayerOnlyChatPoint(on: any): void
  handleNoEmotePoint(on: any): void
  addLateJoinPlayer(player: any): QuizPlayer
  updateEnemyTarget(targetPosition: any, targetPlayer: any): void
  handleNexusEvent(event: any, finishedCallback?: () => void): void
  getNexusTarget(targetType: any, slot: any): any
  sortNexusEvents(events: any): any
  updateSwapTarget(slotOne: any, slotTwo: any): void
  clearSwapIcons(): void
  displayAbilityTarget($targetIcon: any, ability: any, mouseX: any, mouseY: any): void
  currentAbilityTargetClickHandler: (target: any) => void
  currentAbilityMouseMoveHandler: (event: any) => void
  currentAbilityTargetClearHandler: () => void
  $currentAbilityTargetIcon: any
  clearAbilityTarget(): void
  handleNewNexusCharacterClick(quizPlayer: any): boolean
  get ownGroupSlot(): string
  QUIZ_STATES: {
    PRESETUP: number
    LOADING: number
    WAITING_FOR_READY: number
    GUESS_PHASE: number
    ANSWER_PHASE: number
    SHOW_ANSWER_PHASE: number
    END_PHASE: number
    WAITING_BUFFERING: number
    WAITING_ANSWERS_PHASE: number
    BATTLE_ROYAL: number
    PAUSE: number
    EXTRA_GUESS_TIME: number
  }
  SCORE_TYPE_IDS: {
    COUNT: number
    SPEED: number
    LIVES: number
  }
  SHOW_SELECTION_IDS: {
    AUTO: number
    LOOTING: number
  }
  TEAM_ANSWER_IN_CHAT_STATES: {
    NEVER: number
    OUT_OF_FOCUS: number
    ALWAYS: number
  }
  SKIP_PHASES: any[]
  SHOW_TIMER_PHASES: any[]
  CURRENT_BUFFER_FOCUS_PHASES: any[]
  NEXUS_DELAYED_EVENT_DELAY: number
}
declare var quiz: Quiz
