declare function Options(): void
declare class Options {
  $modal: JQuery<HTMLElement>
  menuItem: JQuery<HTMLElement>
  optionMenuContainer: JQuery<HTMLElement>
  _$blockedPlayerModalContent: JQuery<HTMLElement>
  _$blockedPlayerModal: JQuery<HTMLElement>
  _$blockedPlayerTable: JQuery<HTMLElement>
  _blockedPlayerTemplate: string
  $CPM_CURRENT_PASSWORD: JQuery<HTMLElement>
  $CPM_NEW_PASSWORD: JQuery<HTMLElement>
  $CPM_REPEAT_PASSWORD: JQuery<HTMLElement>
  $CPM_MESSAGE_CONTAINER: JQuery<HTMLElement>
  $MAl_SHARE_CHECKBOX: JQuery<HTMLElement>
  $SHARE_SCORE_CHECKBOX: JQuery<HTMLElement>
  $SHARE_SCORE_CONTAINER: JQuery<HTMLElement>
  $AUTO_SUBMIT_CHECKBOX: JQuery<HTMLElement>
  $AUTO_VOTE_GUESS: JQuery<HTMLElement>
  $AUTO_VOTE_REPLAY: JQuery<HTMLElement>
  $DISABLE_EMOJIS: JQuery<HTMLElement>
  $INCLUDE_WATCHING_CHECKBOX: JQuery<HTMLElement>
  $INCLUDE_COMPLETED_CHECKBOX: JQuery<HTMLElement>
  $INCLUDE_ON_HOLD_CHECKBOX: JQuery<HTMLElement>
  $INCLUDE_DROPPED_CHECKBOX: JQuery<HTMLElement>
  $INCLUDE_PLANNING_CHECKBOX: JQuery<HTMLElement>
  $DISABLE_FLOATING_TEXT: JQuery<HTMLElement>
  DEFAULT_FLOATING_TEXT: boolean
  $PARTICLE_SLIDER: JQuery<HTMLElement>
  DEFAULT_PARTICLE_QUALITY: number
  $HOST_PRIOTISE_SLIDER: JQuery<HTMLElement>
  HOST_PRIO: {
    RESOLUTION: number
    HOST: number
  }
  DEFAULT_HOST_PRIORITY: number
  $LIST_NAME_INPUTS: {
    1: JQuery<HTMLElement>
    2: JQuery<HTMLElement>
    3: JQuery<HTMLElement>
  }
  ANIME_LIST_IDS: {
    ANILIST: number
    KTISU: number
    MAL: number
    ANN: number
  }
  ANIME_LIST_BASE_URL: {
    ANILIST: string
    KTISU: string
    MAL: string
    ANN: string
  }
  $ANIME_LIST_SLIDER: JQuery<HTMLElement>
  $SHOW_NAME_SLIDER: JQuery<HTMLElement>
  $SHOW_TEAM_ANSWERS_SLIDER: JQuery<HTMLElement>
  $soundEqualizerAdvancedContainer: JQuery<HTMLElement>
  $soundEqualizerMaxVolumeSlider: JQuery<HTMLElement>
  DEFAULT_EQUALIZE_MAX_VOLUME: number
  $autoHideOpenings: JQuery<HTMLElement>
  $autoHideEndings: JQuery<HTMLElement>
  $autoHideInserts: JQuery<HTMLElement>
  $autoHideUnwatched: JQuery<HTMLElement>
  $autoHideHighRisk: JQuery<HTMLElement>
  AUTO_SWITCH_AVATAR_STATES: {
    OFF: number
    CYCLE: number
    RANDOM: number
  }
  AUTO_SWITCH_AVATAR_NAMES: {
    0: string
    1: string
    2: string
  }
  $SETTING_TABS: JQuery<HTMLElement>
  $SETTING_CONTAINERS: JQuery<HTMLElement>
  timeoutTime: number
  lastHoverTimeout: NodeJS.Timeout
  _malLastUpdateListener: Listener
  _aniListLastUpdateListener: Listener
  _kitsuLastUpdateListener: Listener
  show(): void
  setup(
    malName: any,
    malLastUpdate: any,
    settings: any,
    aniListName: any,
    aniListLastUpdate: any,
    kitsuName: any,
    kitsuLastUpdate: any,
    useRomajiNames: any,
    serverStatuses: any,
    hostNames: any
  ): void
  autoSubmit: any
  autoVoteSkipGuess: any
  autoVoteSkipReplay: any
  disableEmojis: any
  useRomajiNames: any
  showTeamAnswersState: any
  autoSwitchFavoritedAvatars: any
  equalizeSound: any
  autoHideOpenings: any
  autoHideEndings: any
  autoHideInserts: any
  autoHideUnwatched: any
  autoHideHighRisk: any
  animeListLinkId: any
  equalizeMaxVolume: any
  disableFloatingText: any
  soundEqualizerSwitch: Switch
  _SERVER_STATUS_TABLE: ServerStatusTable
  _HOST_PRIO_LIST: HostPrioList
  nexusAudioMasterSliderCombo: SliderTextCombo
  nexusAudioOSTSliderCombo: SliderTextCombo
  nexusAudioSFXSliderCombo: SliderTextCombo
  setMalLastUpdate(date: any): void
  setAniListLastUpdate(date: any): void
  setKitsuLastUpdate(date: any): void
  hoverHandler(hover: any): void
  logout(): void
  updateMal(): void
  updateAniList(): void
  updateKitsu(): void
  updatePassword(): void
  showCPMWarning(msg: any, danger: any): void
  updateShareMal(): void
  updateShareScore(): void
  updateListInclusion(checkbox: any, name: any): void
  updateAutoSubmit(): void
  updateAutoVoteSkipGuess(): void
  updateAutoVoteSkipReplay(): void
  updateDisableEmojis(): void
  updateAutoHideOpenings(): void
  updateAutoHideEndings(): void
  updateAutoHideInserts(): void
  updateAutoHideUnwatched(): void
  updateAutoHideHighRisk(): void
  updateDisableFloatingText(): void
  setParticleQuality(newValue: any): void
  particleQuality: any
  setAnimeListLinkId(newValue: any): void
  setUseRomajiNames(newValue: any): void
  setShowTeamAnswersState(newValue: any): void
  setAutoSwitchFavoritedAvatars(newValue: any): void
  setEqualizeSound(newValue: any): void
  setEqualizeMaxVolume(newValue: any): void
  selectTab(contentContainerId: any, tab: any): void
  setNexusMasterVolume(newValue: any): void
  setNexusMusicVolume(newValue: any): void
  setNexusSfxVolume(newValue: any): void
  getHostPriorityList(): any[]
  getHostResPrio(): any
  getListUsername(listId: any): any
  gotAnimeList(): boolean
}
declare function createHoverFunction(target: any, handler: any): void
declare var options: Options
