declare class EmojiSelector {
  $container: JQuery<HTMLElement>
  $button: JQuery<HTMLElement>
  $lockInContainer: JQuery<HTMLElement>
  $allEmoteContainer: JQuery<HTMLElement>
  $recentEmoteContainer: JQuery<HTMLElement>
  isOpen: boolean
  entries: any[]
  recentEmotes: any[]
  MAX_NUMBER_OF_RECENT: number
  setup(recentEmotes: any): void
  setupRecent(recentEmotes: any): void
  insertRecentEmote(emoteId: any, emojiId: any, shortCode: any): void
  buildRecent(): void
  buildEntries(): void
  createEmoteEntry(emoteInfo: any, emoteId: any): EmojiSelectorEntry
  insertEmote(emoteInfo: any): void
  createEmojiEntry(emojiInfo: any, emojiId: any): EmojiSelectorEntry
  insertEmoji(emojiInfo: any): void
  createShortCodeEntry(shortcode: any): EmojiSelectorEntry
  removeRecentEmoji(emojiId: any): void
  open(): void
  close(): void
  setLockInMode(on: any): void
  lockInEmoteInMsg(msg: any): void
  clearLockedInEmote(): void
  setLockedInEmote($emote: any): void
}
declare class EmojiSelectorEntry {
  constructor(
    name: any,
    src: any,
    srcSet: any,
    locked: any,
    $container: any,
    emoteId: any,
    emojiId: any,
    shortCode: any
  )
  name: any
  emoteId: any
  emojiId: any
  shortCode: any
  $entry: JQuery<any>
  preLoadImage: PreloadImage
  TEMPLATE: string
}
declare var emojiSelector: EmojiSelector
