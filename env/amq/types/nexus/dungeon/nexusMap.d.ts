declare class NexusMapController {
  $container: JQuery<HTMLElement>
  $hoverContainer: JQuery<HTMLElement>
  $iconOvelayContainer: JQuery<HTMLElement>
  $fragmentCounter: JQuery<HTMLElement>
  fragmentCounter: TextCounter
  canvasController: AdvancedAnimationControllerTripple
  backgroundCanvas: BackgroundImageCanvas
  backdropCanvas: TileBackdropCanvas
  ostAudioGroup: any
  statusController: NexusAvatarStatusController
  rewardWindow: NexusMapRewardWindow
  eventWindow: NexusEventWindow
  storeWindow: NexusStoreWindow
  resultWindow: NexusDungeonResultWindow
  runeInventory: RuneInventory
  abandonVote: NexusAbandonRunVoteContainer
  tileRowMap: {}
  tileList: any[]
  playerVoteIcons: {}
  _fragmentCount: number
  artifactFlashImageBuffer: {}
  buffFlashImageBuffer: {}
  runeFlashImageBuffer: {}
  badgeFlashImageBuffer: {}
  activePan: boolean
  active: boolean
  mapElementsHidden: boolean
  maxThreeArtifacts: boolean
  exitButton: DomElement
  _mapInitListener: Listener
  set fragmentCount(arg: number)
  get fragmentCount(): number
  _nexusMapReadyListener: Listener
  _tileSelectListener: Listener
  _enemyyEncounterListener: Listener
  _enemyyEncounterResultListener: Listener
  _nexusGameEventsListener: Listener
  _playNextSongListener: Listener
  _partyWipeListener: Listener
  _dungeonClear: Listener
  _nexusAvatarArtifactListener: Listener
  _nexusRemoveAvatarArtifactListener: Listener
  _nexusFragmentChangeListener: Listener
  _nexusAvatarHpChangesListener: Listener
  _nexusNewRewardsListener: Listener
  _nexusStoreTileListener: Listener
  _nexusStoreArtifactBoughtListener: Listener
  _nexusStoreEventEndListener: Listener
  _nexusDungeonFinishedListener: Listener
  _nexusRuneFoundListener: Listener
  _nexusMapEventListener: Listener
  _nexusMapTileVoteListener: Listener
  _nexusMapOptionVoteListener: Listener
  _nexusMapRejoinListener: Listener
  _nexusMapStateListener: Listener
  _exitNexusGameListener: Listener
  get currentTileFocusY(): number
  get tileSize(): number
  get backdropSize(): number
  loadMap(mapInfo: any, callback: any): void
  get exitButtonText(): 'Exit' | 'Save & Exit'
  get exitButtonDesription(): string
  handleNewQuizEvents(events: any): void
  show(): void
  hide(): void
  initMap(activeSession: any): void
  setupTiles(tileList: any): void
  currentTileSize: any
  updateDragOffsetLimits(): void
  mapBaseY: number
  tileHeight: any
  handleTileSelect(row: any, col: any): void
  setCurrentTile(row: any, col: any): void
  currentTile: any
  clearPlayerVotes(): void
  disableTile(row: any, col: any): void
  getTileInDirection(currentRow: any, currentCol: any, direction: any): any
  handleMouseMove(canvasX: any, canvasY: any): void
  currentHoverTile: any
  clearTileDescription(): void
  handleMouseClick(canvasX: any, canvasY: any): void
  getTileInCords(x: any, y: any): any
  translateToDirectionToColChange(direction: any): 0 | 1 | -1
  closeMap(): void
  readjustCanvasSizes(): void
  reset(): void
  hideMapElements(): void
  pauseOSTTrack(): void
  fadeOSTTrack(target: any, lengthMs: any): void
  setupArtifactFlashImage({ flashAble, fileName }: { flashAble: any; fileName: any }): void
  getArtifactFlashImage(artifactName: any): any
  setupBuffFlashImage(name: any): void
  getBuffFlashImage(name: any): any
  setupRuneFlashImage(name: any): void
  getRuneFlashImage(name: any): any
  setupBadgeFlashImage(badgeInfo: any): void
  getBadgeFlashImage(avatarId: any): any
  switchMapFromGame(): void
  scrollMapTop(): void
  panMapToBottom(delay: any, callback?: () => void): void
  panMapToCord(targetY: any, panSpeed: any, delay: any, callback?: () => void): void
  focusMapOnCurrentTile(): void
  panToCurrentTile(): void
  displayFinalResult(
    {
      xpDistribution,
      avatarXpInfo,
      runeMods,
    }: {
      xpDistribution: any
      avatarXpInfo: any
      runeMods: any
    },
    text: any
  ): void
  FADE_OUT_PERCENT: number
  DRAG_GRACE_SIZE: number
  FULL_PAN_TIME: number
  INITIAL_PAN_DELAY: number
  FOCUS_PAN_SPEED: number
  TILE_SELECT_ANIMATION_TIME: number
  SMALL_TILE_MAX_WIDTH: number
  STANDARD_TILE_SIZE: number
  SMALL_TILE_SIZE: number
}
declare class NexusMapPlayerVoteIcon {
  constructor({
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
  })
  $icon: JQuery<HTMLElement>
  $img: JQuery<HTMLElement>
  imagePreload: PreloadImage
  detach(): void
  TEMPLATE: string
}
