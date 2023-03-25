declare class FlaggedMessageContainer {
  $container: JQuery<HTMLElement>
  $contentContainer: JQuery<HTMLElement>
  $counter: JQuery<HTMLElement>
  $displayButton: JQuery<HTMLElement>
  $clearAllButton: JQuery<HTMLElement>
  entryMap: {}
  show(): void
  hide(): void
  toggleDisplay(): void
  addEntry({
    messagePayload,
    rankedChatBanState,
    rankedChatBanTime,
  }: {
    messagePayload: any
    rankedChatBanState: any
    rankedChatBanTime: any
  }): void
  removeEntry(messageId: any): void
  updateCount(): void
  setMessageWarned(messageId: any): void
  setMessageBanned(messageId: any): void
  clear(): void
}
declare class FlaggedMessageContainerEntry {
  constructor(
    {
      sender,
      message,
      messageId,
      emojis,
    }: {
      sender: any
      message: any
      messageId: any
      emojis: any
    },
    rankedChatBanState: any,
    rankedChatBanTime: any,
    controller: any
  )
  $html: JQuery<any>
  $warnButton: JQuery<HTMLElement>
  $banButton: JQuery<HTMLElement>
  $resultContainer: JQuery<HTMLElement>
  $resultText: JQuery<HTMLElement>
  messageId: any
  controller: any
  active: boolean
  showResult(text: any): void
  remove(): void
  TEMPLATE: string
}
