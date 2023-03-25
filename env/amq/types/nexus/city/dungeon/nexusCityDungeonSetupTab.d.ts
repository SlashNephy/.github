declare class NexusCityDungeonSetupTab extends NexusCityWindowTab {
  constructor(window: any)
  $startButton: any
  $ratingContainer: any
  $loadTeamButton: any
  $lobbyIdContainer: any
  $lobbyIdText: any
  $hideIdButton: any
  $showIdButton: any
  $ratingRow: any
  $floorRow: any
  inLobby: boolean
  coopLobby: boolean
  floorSelector: NexusFloorSelector
  slotMap: {
    1: NexusCityDungeonSetupTabAvatarSlot
    2: NexusCityDungeonSetupTabAvatarSlot
    3: NexusCityDungeonSetupTabAvatarSlot
    4: NexusCityDungeonSetupTabAvatarSlot
  }
  avatarSelector: NexusCityDungeonWindowAvatarSelector
  doingReset: boolean
  starRating: NexusCityDungeonSetupTabRatingDisplay
  typeButtonSet: NexusCityDungeonSetupTabTypeButtonSet
  diffButtonSet: NexusCityDungeonSetupTabDiffButtonSet
  selectionButtonSet: NexusCityDungeonSetupTabAvatarSelectionButtonSet
  _nexusDungeonFinishedListener: Listener
  _nexusUpdateLobbyPlayerSlotsListener: Listener
  _nexusLobbyHostChangeListener: Listener
  _nexusPlayerLeaveListener: Listener
  _nexusLobbySettingUpdateListener: Listener
  _mapInitListener: Listener
  _nexusMapStateListener: Listener
  _updatedFloorProgress: Listener
  get allSlotsInUse(): boolean
  get allSlots(): NexusCityDungeonSetupTabAvatarSlot[]
  get viableSettings(): boolean
  get settingDescription(): {
    settings: {
      songTypes: {
        openings: any
        endings: any
        inserts: any
      }
      difficulties: {
        easy: any
        medium: any
        hard: any
      }
      songSelection: {
        watched: any
        random: any
      }
    }
    floor: number
  }
  updatePlayerNameSizes(): void
  updateSettings({
    settings: { songTypes, difficulties, songSelection },
    floor,
  }: {
    settings: {
      songTypes: any
      difficulties: any
      songSelection: any
    }
    floor: any
  }): void
  setupLayout(lobbyId: any, slotsInfo: any): void
  inCoopLobby: boolean
  disableSettings(): void
  enableSettings(): void
  handleSettingsUpdated(): void
  calculateCurrentRating(): any
  avatarChange(
    clearTileSlots: any,
    newAvatarSlots: any
  ): {
    removedCharacterIds: any[]
    newCharacterIds: any[]
  }
  badgeChange(clearBadgeSlots: any, newBadgeSlots: any): void
  sendSettingUpdate(): void
  updateFloorProgress(floorProgress: any): void
}
declare class NexusCityDungeonSetupTabAvatarSlot {
  constructor(number: any, $slot: any, clickHandler: any, badgeClickHandler: any)
  $slot: any
  $avatarImg: any
  $slotText: any
  $slotSideText: any
  $slotLevelText: any
  $slotLevelTextNumber: any
  $playerSlot: any
  $playerName: any
  $progressContainer: any
  number: any
  coopGame: boolean
  characterId: any
  avatarSelected: boolean
  playerSlot: NexusCityDungeonSetupTabAvatarPlayerSlot
  badgeSlot: NexusCityDungeonSetupTabAvatarBadgeSlot
  updatePlayerNameSize(): void
  setDisplayPlayer(displayPlayer: any): void
  updateLevel(level: any): void
  displayAvatar({
    avatarId,
    colorId,
    backgroundAvatarId,
    backgroundColorId,
    level,
    baseStats,
    runeInfo,
    genreInfo,
    abilityInfo,
    soloProgress,
    coopProgress,
    optionActive,
  }: {
    avatarId: any
    colorId: any
    backgroundAvatarId: any
    backgroundColorId: any
    level: any
    baseStats: any
    runeInfo: any
    genreInfo: any
    abilityInfo: any
    soloProgress: any
    coopProgress: any
    optionActive: any
  }): void
  preloadImage: PreloadImage
  graceHover: GraceHoverHandler
  updateProgress(soloProgress: any, coopProgress: any): void
  reset(keepPlayer: any): void
  displayBadge(badgeInfo: any): void
  removeBadge(): void
  calculateProgressValue({ rating, floor }: { rating: any; floor: any }): any
  PROGRESS_ROW: string
}
declare class NexusCityDungeonSetupTabAvatarPlayerSlot {
  constructor($container: any, $name: any, slotId: any)
  $container: any
  $name: any
  $nameTextContainer: any
  $img: any
  $emptyText: any
  slotId: any
  imagePreload: PreloadImage
  gotPlayer: boolean
  get claimedBySelf(): boolean
  claimSlot(): void
  hide(): void
  show(): void
  displayPlayer({
    name,
    icon: {
      emoteId,
      avatarInfo: {
        avatar: { avatarName, outfitName, colorName, optionName, optionActive },
      },
    },
  }: {
    name: any
    icon: {
      emoteId: any
      avatarInfo: {
        avatar: {
          avatarName: any
          outfitName: any
          colorName: any
          optionName: any
          optionActive: any
        }
      }
    }
  }): void
  currentPlayerName: any
  updatePlayerNameSize(): void
  clearPlayer(): void
  reset(): void
}
declare class NexusCityDungeonSetupTabAvatarBadgeSlot {
  constructor($badgeContainer: any, slotId: any, clickHandler: any)
  $badgeContainer: any
  slotId: any
  currentBadge: NexusBadge
  graceHover: GraceHoverHandler
  emptyBadge: NexusBadgeEmpty
  get gotBadge(): boolean
  show(): void
  hide(): void
  displayBadge(badgeInfo: any): void
  displayEmpty(): void
  clearBadge(): void
  reset(): void
}
declare class NexusCityDungeonSetupTabBaseButtonSet {
  constructor(buttonInfoList: any, updateRatingCallback: any)
  buttons: any
  get state(): void
  get rating(): void
  get selectedCount(): any
  get viable(): any
  reset(): void
  disable(): void
  enable(): void
}
declare class NexusCityDungeonSetupTabConfigButton {
  constructor(
    {
      $element,
      defaultSelected,
    }: {
      $element: any
      defaultSelected: any
    },
    updateRatingCallback: any
  )
  $element: any
  defaultSelected: any
  updateRatingCallback: any
  set selected(arg: any)
  get selected(): any
  _selected: any
  reset(): void
  disable(): void
  enable(): void
}
declare class NexusCityDungeonSetupTabTypeButtonSet extends NexusCityDungeonSetupTabBaseButtonSet {
  constructor(updateRatingCallback: any)
  get state(): {
    openings: any
    endings: any
    inserts: any
  }
  get rating(): any
  updateState({ openings, endings, inserts }: { openings: any; endings: any; inserts: any }): void
}
declare class NexusCityDungeonSetupTabDiffButtonSet extends NexusCityDungeonSetupTabBaseButtonSet {
  constructor(updateRatingCallback: any)
  get state(): {
    easy: any
    medium: any
    hard: any
  }
  get rating(): 0 | 1 | 2 | 3 | 4
  updateState({ easy, medium, hard }: { easy: any; medium: any; hard: any }): void
}
declare class NexusCityDungeonSetupTabAvatarSelectionButtonSet extends NexusCityDungeonSetupTabBaseButtonSet {
  constructor(updateRatingCallback: any)
  get state(): {
    watched: any
    random: any
  }
  get rating(): 0 | 1 | 3
  updateState({ watched, random }: { watched: any; random: any }): void
}
declare class NexusCityDungeonSetupTabRatingDisplay {
  $starOne: JQuery<HTMLElement>
  $starTwo: JQuery<HTMLElement>
  $starThree: JQuery<HTMLElement>
  $starFour: JQuery<HTMLElement>
  $starFive: JQuery<HTMLElement>
  updateRating(targetRating: any): void
  FULL_STAR_CLASS: string
  HALF_STAR_CLASS: string
  EMPTY_STAR_CLASS: string
}
declare class NexusFloorSelector {
  constructor(settingUpdateCallback: any)
  $floorNumber: JQuery<HTMLElement>
  $leftArrow: JQuery<HTMLElement>
  $rightArrow: JQuery<HTMLElement>
  $descrition: JQuery<HTMLElement>
  _floor: number
  floorProgress: {}
  _disabled: boolean
  lockMax: boolean
  settingUpdateCallback: any
  set floor(arg: number)
  get floor(): number
  set disabled(arg: boolean)
  get disabled(): boolean
  updateActiveArrows(): void
  disable(): void
  enable(): void
  updateFloorProgress(floorProgress: any): void
  updateDungeonRating(rating: any): void
  currentRating: any
  MAX_FLOOR: number
  MIN_FLOOR: number
  FLOOR_DESCRIPTIONS: {
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
    7: string
    8: string
    9: string
    10: string
    11: string
    12: string
    13: string
    14: string
    15: string
    16: string
    17: string
    18: string
    19: string
    20: string
    21: string
    22: string
    23: string
    24: string
    25: string
  }
}
