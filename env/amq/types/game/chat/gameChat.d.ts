declare function GameChat(): void
declare class GameChat {
  $view: JQuery<HTMLElement>
  open: boolean
  MAX_MESSAGE_LENGTH: number
  MOD_BAN_MESSAGE_COMMAND_REGEX: RegExp
  MOD_BAN_MESSAGE_LENGTH: number
  MOD_CLEAR_BAN_MESSAGE_REGEX: RegExp
  $chatMessageContainer: JQuery<HTMLElement>
  $chatInputField: JQuery<HTMLElement>
  $spectatorView: JQuery<HTMLElement>
  $chatView: JQuery<HTMLElement>
  $gameChatButton: JQuery<HTMLElement>
  $spectateListButton: JQuery<HTMLElement>
  $spectatorList: JQuery<HTMLElement>
  $spectatorCounter: JQuery<HTMLElement>
  $SCROLLABLE_CONTAINERS: JQuery<HTMLElement>
  $QUEUE_LIST_BUTTON: JQuery<HTMLElement>
  $QUEUE_TAB: JQuery<HTMLElement>
  $QUEUE_LIST: JQuery<HTMLElement>
  $QUEUE_COUNT: JQuery<HTMLElement>
  $QUEUE_JOIN_BUTTON_TEXT: JQuery<HTMLElement>
  _$CHAT_MENU: JQuery<HTMLElement>
  $SPECTATE_HOST_ICON: JQuery<HTMLElement>
  $CHAT_TEXTAREA_CONTAINER: JQuery<HTMLElement>
  $SPECTATE_BUTTON: JQuery<HTMLElement>
  $QUEUE_BUTTON: JQuery<HTMLElement>
  $PLAYER_ONLY_MESSAGE: JQuery<HTMLElement>
  playerOnlyMode: boolean
  noEmoteMode: boolean
  spectators: any[]
  queueMap: {}
  lastChatCursorPosition: number
  displayJoinLeaveMessages: boolean
  MAX_CHAT_MESSAGES: number
  currentMessageCount: number
  CHAT_COOLDOWN_LENGTH: number
  lastMessageCooldown: number
  slowModeActive: boolean
  $cooldownBar: JQuery<HTMLElement>
  $cooldownBarContainer: JQuery<HTMLElement>
  COOLDOWN_POPOVER_DISPLAY_TIME: number
  SPAM_COOLDOWN: number
  lastMessageInfo: {
    msg: any
    cooldownUntil: number
  }
  MINIMUM_LEVEL_TO_CHAT_IN_SLOW_MODE: number
  _TABS: {
    CHAT: number
    SPECTATORS: number
    QUEUE: number
  }
  currentTab: number
  serverMsgTemplate: string
  playerMsgTemplate: string
  playerMsgBadgeTemplate: string
  spectatorListItemTemplate: string
  _PLAYER_COMMANDS_TEMPLATE: string
  _QUEUE_ENTRY_TEMPLATE: string
  $teamChatSwitchContainer: JQuery<HTMLElement>
  teamChatSwitch: Switch
  emoteSelectorWrapper: EmoteSelectorInputWrapper
  _newMessageListner: Listener
  _newSystemMessageListner: Listener
  _chatUpdateListener: Listener
  _newSpectatorListner: Listener
  _spectatorLeftListner: Listener
  _playerLeaveListner: Listener
  _spectatorChangeToPlayer: Listener
  _kickedFromGameListner: Listener
  _forceSpectatorListner: Listener
  _settingChangeListener: Listener
  _newQueueEntryListener: Listener
  _playerLeftQueueListener: Listener
  _hostPromotionListner: Listener
  _playerNameChangeListner: Listener
  _spectatorNameChangeListner: Listener
  _deletePlayerMessagesListener: Listener
  _deleteChatMessageListener: Listener
  _pauseTriggerListener: Listener
  _unpauseTriggerListener: Listener
  _playerRejoiningListener: Listener
  _answerResultsListener: Listener
  _playerLateJoinListener: Listener
  setup(): void
  atSelfRegex: RegExp
  emoteBubler: EmoteBubler
  openView(): void
  closeView(): void
  systemMessage(title: any, msg: any, teamMessage: any): void
  chatMessage({
    sender,
    modMessage,
    message,
    emojis,
    badges,
    messageId,
    atEveryone,
    teamMessage,
    nameColor,
    nameGlow,
  }: {
    sender: any
    modMessage: any
    message: any
    emojis: any
    badges: any
    messageId: any
    atEveryone: any
    teamMessage: any
    nameColor: any
    nameGlow: any
  }): void
  removeTwoOldestMessages(): void
  insertMsg(msg: any): void
  sendMessage(): void
  banMessage(): void
  clearBannedMessages(): void
  displaySlowModeMessage(msg: any): void
  cooldownPopoverTimeout: NodeJS.Timeout
  messageRepeated(msg: any): boolean
  updateNameInChat(targetName: any, newName: any): void
  deletePlayersMessagesInChat(playerName: any): void
  viewSpectators(): void
  viewChat(): void
  viewQueue(): void
  resetView(): void
  addSpectator(spectator: any, isHost: any): void
  bindSpectatorClickFunctions($entry: any, name: any): void
  updateSpectatorNameFontSize(spectatorName: any): void
  removeSpectator(spectatorName: any): void
  enableHostOptions(newHostName: any): void
  disableHostOptions(): void
  kickSpectator(playerName: any): void
  isShown(): boolean
  setSpectatorButtonState(enabled: any): void
  setQueueButtonState(enabled: any): void
  insertEmoji(emoji: any): void
  insertText(texToInsert: any): void
  focus(): void
  updateChatScroll(): void
  toggleQueueTab(on: any): void
  joinLeaveQueue(): void
  removePlayerFromQueue(playerName: any): void
  resetQueue(): void
  addPlayerToQueue(playerName: any): void
  toggleShowTeamChatSwitch(show: any): void
  getTeamChatToggleSwitchActive(): boolean
  setPlayerOnlyMode(on: any): void
  MOD_INSTANT_FLAG_TYPES: {
    SPAM: number
    SPOILING: number
    NEGATIVE: number
  }
}
declare var gameChat: GameChat
