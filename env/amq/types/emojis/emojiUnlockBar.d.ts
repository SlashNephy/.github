declare function EmojiUnlockBar(): void
declare class EmojiUnlockBar {
  _$unlockContainer: JQuery<HTMLElement>
  _EMOJI_PREVIEW_TEMPLATE: string
  _OUTFIT_EMOJI_BASE: {
    80: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
    81: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
    84: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
    85: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
    86: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
    87: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
    88: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
    89: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
    90: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
    91: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
    92: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
    93: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
    94: {
      BASE: string
      DEFAULT_COLOR: string
      TYPE_AT_LEVEL: {
        1: string[]
        3: string[]
        5: string[]
        8: string[]
        10: string[]
      }
    }
  }
  _unlockListner: Listener
  setup(unlockedDesigns: any): void
  avatarLevels: {}
  show(avatarId: any): void
  _currentAvatarId: any
  hide(): void
  updateToOutfit(avatarId: any): void
  showProgress(avatarId: any): void
  newOutfitUnlocked(avatarId: any): void
  getAvatarLevel(avatarId: any): any
  haveEntryForOutfit(avatarId: any): boolean
}
declare var emojiUnlockBar: EmojiUnlockBar
