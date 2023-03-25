declare function EmojiPreviewTab(): void
declare class EmojiPreviewTab {
  _MAXIMUM_FILE_SIZE: number
  _MAX_EMOJI_NAME_LENGH: number
  _PREVIEW_EMOJI_AMOUNT: number
  _EMOJI_TYPES: {
    STANDARD: number
    ANIMATED: number
  }
  _EMOJI_SLOTS_FOR_BACKERLEVEL: {
    0: {
      1: number
      2: number
    }
    1: {
      1: number
      2: number
    }
    2: {
      1: number
      2: number
    }
    3: {
      1: number
      2: number
    }
    4: {
      1: number
      2: number
    }
    5: {
      1: number
      2: number
    }
    6: {
      1: number
      2: number
    }
  }
  _EMOJI_TEMPLATE: string
  _EMOJI_IMAGE_PREVIEW_TEMPLATE: string
  _backerLevel: number
  _standardEmojis: any[]
  _animatedEmojis: any[]
  newAvatarListener: void
  updateContent(emojis: any, backerLevel: any): void
  _$EMOJI_LIST: JQuery<HTMLElement>
  _$EMOJI_LIST_CONTAINER: JQuery<HTMLElement>
  _$INNER_CONTAINER: JQuery<HTMLElement>
  _$MANAGE_BUTTON: JQuery<HTMLElement>
  _$CLOSE_BUTTON: JQuery<HTMLElement>
  _$UPLOAD_BUTTON: JQuery<HTMLElement>
  _$USED_EMOJI_SLOT_LIST: JQuery<HTMLElement>
  _$EMPTY_EMOJI_SLOT_LIST: JQuery<HTMLElement>
  _$EMOJI_PREVIEW_LIST: JQuery<HTMLElement>
  open(): void
  close(): void
  getOpenSlotsForType(type: any): number
  addEmojiEntry(emoji: any): void
  addEmptySlots(): void
  updateEmptyEmoji(emoji: any): void
  setEmojiEmpty(emojiId: any): void
  updatePreviewEmojis(): void
  getEmojiDescriptoins(): any[]
  getEmojiDescription(emojiId: any): any
  clearEmojis(): void
  buildEmojiRegex(): void
  emojiRegex: RegExp
}
declare function EmojiTabEntry(emoji: any, isAnimated: any): void
declare class EmojiTabEntry {
  constructor(emoji: any, isAnimated: any)
  _EMPTY_EMOJI_PREVIEW_TEMPLATE: string
  _EMOJI_PREVIEW_TEMPLATE: string
  _emoji: any
  enabled: boolean
  empty: boolean
  isAnimated: any
  updateBody(): void
  $body: JQuery<any>
  updateState(): void
  getEmojiId(): any
  updateEmoji(newEmoji: any): void
  remove(): void
  updateValidation(validated: any, active: any): void
  getEmojiDescription(): any
}
