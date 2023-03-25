declare class CheatTestModal {
  $modal: JQuery<HTMLElement>
  $modView: JQuery<HTMLElement>
  $modEntries: JQuery<HTMLElement>
  $testeeView: JQuery<HTMLElement>
  $triggerContainer: JQuery<HTMLElement>
  $testTimeContainer: JQuery<HTMLElement>
  $triggerHighlight: JQuery<HTMLElement>
  $openCloseNoticeButton: JQuery<HTMLElement>
  $openCloseChevarons: JQuery<HTMLElement>
  modEntries: {}
  targetMode: boolean
  open: boolean
  noticeOpen: boolean
  setupCheatTestGameListener: Listener
  cheatTestGameIniteListener: Listener
  setup(isMod: any, testInfo: any): void
  messageController: CheatTestChatController
  toggleHighlight(on: any): void
  updateTargetLastViewMessageIndex(challengeId: any, newIndex: any): void
  updateModHighlightToggle(): void
  removeEntry(challengeId: any): void
  hideContainer(): void
}
declare class CheatTestModEntry {
  constructor({
    challengeId,
    name,
    status,
    time,
    messages,
    lastMessageIndex,
  }: {
    challengeId: any
    name: any
    status: any
    time: any
    messages: any
    lastMessageIndex: any
  })
  challengeId: any
  messages: any
  $row: JQuery<any>
  $highlight: JQuery<HTMLElement>
  highlightOn: boolean
  newMessageListener: Listener
  toggleHighlight(on: any): void
  MODAL_ROW_TEMPLATE: string
}
declare class CheatTestChatController {
  $messageContainer: JQuery<HTMLElement>
  $messageInput: JQuery<HTMLElement>
  messageCount: number
  newMessageListener: Listener
  get scrollAtBottom(): boolean
  setupForChallenge(challengeId: any, messages: any): void
  currentChallengeId: any
  insertMessage(name: any, message: any): void
  updateScroll(forceBottom: any): void
  MESSAGE_TEMPLATE: string
}
declare var cheatTestModal: CheatTestModal
