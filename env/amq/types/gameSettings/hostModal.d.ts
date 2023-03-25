declare function HostModal(): void
declare class HostModal {
  $view: JQuery<HTMLElement>
  $title: JQuery<HTMLElement>
  $hostButton: JQuery<HTMLElement>
  $changeButton: JQuery<HTMLElement>
  $JOIN_BUTTON: JQuery<HTMLElement>
  $SPECTATE_BUTTON: JQuery<HTMLElement>
  $PREVIEW_BUTTON_CONTAINER: JQuery<HTMLElement>
  $MODE_BUTTON: JQuery<HTMLElement>
  $SHOW_HIDE_PASSWORD_BUTTON: JQuery<HTMLElement>
  $INVITE_LINK_BUTTON: JQuery<HTMLElement>
  $LIFE_SETTING_CONTAINER: JQuery<HTMLElement>
  $GUESS_TIME_SETTING_CONTAINER: JQuery<HTMLElement>
  $SONG_SELECTION_OUTER_CONTAINER: JQuery<HTMLElement>
  $BATTLE_ROYALE_SETTING_ROW: JQuery<HTMLElement>
  $LOOT_DROPPING_CONTAINER: JQuery<HTMLElement>
  $ROOM_SIZE_LIMITED_CONTAINER: JQuery<HTMLElement>
  $ROOM_SIZE_UNLIMITED_CONTAINER: JQuery<HTMLElement>
  $songPool: JQuery<HTMLElement>
  $privateCheckbox: JQuery<HTMLElement>
  $passwordInput: JQuery<HTMLElement>
  $songTypeInsert: JQuery<HTMLElement>
  $songTypeEnding: JQuery<HTMLElement>
  $songTypeOpening: JQuery<HTMLElement>
  $roomName: JQuery<HTMLElement>
  $showSelection: JQuery<HTMLElement>
  $scoring: JQuery<HTMLElement>
  $answering: JQuery<HTMLElement>
  $watchedDistribution: JQuery<HTMLElement>
  $skipGuessing: JQuery<HTMLElement>
  $skipReplay: JQuery<HTMLElement>
  $duplicateShows: JQuery<HTMLElement>
  $lootDropping: JQuery<HTMLElement>
  $queueing: JQuery<HTMLElement>
  $rebroadcastSongs: JQuery<HTMLElement>
  $dubSongs: JQuery<HTMLElement>
  $playbackSpeed: JQuery<HTMLElement>
  $playerScore: JQuery<HTMLElement>
  $animeScore: JQuery<HTMLElement>
  $vintageAddToFilterButton: JQuery<HTMLElement>
  $songDiffHard: JQuery<HTMLElement>
  $songDiffMedium: JQuery<HTMLElement>
  $songDiffEasy: JQuery<HTMLElement>
  $songPopLiked: JQuery<HTMLElement>
  $songPopMixed: JQuery<HTMLElement>
  $songPopDisliked: JQuery<HTMLElement>
  $samplePoint: JQuery<HTMLElement>
  $animeTvCheckbox: JQuery<HTMLElement>
  $animeMovieCheckbox: JQuery<HTMLElement>
  $animeOVACheckbox: JQuery<HTMLElement>
  $animeONACheckbox: JQuery<HTMLElement>
  $animeSpecialCheckbox: JQuery<HTMLElement>
  $openingCategoryOptions: JQuery<HTMLElement>
  $openingInstrumentalCheckbox: JQuery<HTMLElement>
  $openingChantingCheckbox: JQuery<HTMLElement>
  $openingCharacterCheckbox: JQuery<HTMLElement>
  $openingStandardCheckbox: JQuery<HTMLElement>
  $endingCategoryOptions: JQuery<HTMLElement>
  $endingInstrumentalCheckbox: JQuery<HTMLElement>
  $endingChantingCheckbox: JQuery<HTMLElement>
  $endingCharacterCheckbox: JQuery<HTMLElement>
  $endingStandardCheckbox: JQuery<HTMLElement>
  $insertCategoryOptions: JQuery<HTMLElement>
  $insertInstrumentalCheckbox: JQuery<HTMLElement>
  $insertChantingCheckbox: JQuery<HTMLElement>
  $insertCharacterCheckbox: JQuery<HTMLElement>
  $insertStandardCheckbox: JQuery<HTMLElement>
  $gameMode: JQuery<HTMLElement>
  $teamSizeContainer: JQuery<HTMLElement>
  $teamSize: JQuery<HTMLElement>
  $tabContainer: JQuery<HTMLElement>
  $mainContainer: JQuery<HTMLElement>
  $mainContainerInner: JQuery<HTMLElement>
  $settingContainers: JQuery<HTMLElement>
  $quickTab: JQuery<HTMLElement>
  $advancedTab: JQuery<HTMLElement>
  $ANIME_SETTING_CONTAINER: JQuery<HTMLElement>
  $GENERAL_SETTING_CONTAINER: JQuery<HTMLElement>
  $MODE_SETTING_CONTAINER: JQuery<HTMLElement>
  $QUIZ_SETTING_CONTAINER: JQuery<HTMLElement>
  MAX_LEVEL_FOR_HARD_DEFAULT_OFF: number
  roomId: string
  roomPassword: string
  DEFUALT_SETTINGS: {
    roomName: string
    privateRoom: boolean
    password: string
    roomSize: number
    teamSize: number
    numberOfSongs: number
    modifiers: {
      skipGuessing: boolean
      skipReplay: boolean
      queueing: boolean
      duplicates: boolean
      lootDropping: boolean
      rebroadcastSongs: boolean
      dubSongs: boolean
    }
    songSelection: {
      standardValue: number
      advancedValue: {
        watched: number
        unwatched: number
        random: number
      }
    }
    watchedDistribution: number
    songType: {
      standardValue: {
        openings: boolean
        endings: boolean
        inserts: boolean
      }
      advancedValue: {
        openings: number
        endings: number
        inserts: number
        random: number
      }
    }
    openingCategories: {
      instrumental: boolean
      chanting: boolean
      character: boolean
      standard: boolean
    }
    endingCategories: {
      instrumental: boolean
      chanting: boolean
      character: boolean
      standard: boolean
    }
    insertCategories: {
      instrumental: boolean
      chanting: boolean
      character: boolean
      standard: boolean
    }
    guessTime: {
      randomOn: boolean
      standardValue: number
      randomValue: number[]
    }
    extraGuessTime: {
      randomOn: boolean
      standardValue: number
      randomValue: number[]
    }
    scoreType: number
    showSelection: number
    answeringMode: number
    inventorySize: {
      randomOn: boolean
      standardValue: number
      randomValue: number[]
    }
    lootingTime: {
      randomOn: boolean
      standardValue: number
      randomValue: number[]
    }
    lives: number
    samplePoint: {
      randomOn: boolean
      standardValue: number
      randomValue: number[]
    }
    playbackSpeed: {
      randomOn: boolean
      standardValue: number
      randomValue: boolean[]
    }
    songDifficulity: {
      advancedOn: boolean
      standardValue: {
        easy: boolean
        medium: boolean
        hard: boolean
      }
      advancedValue: number[]
    }
    songPopularity: {
      advancedOn: boolean
      standardValue: {
        disliked: boolean
        mixed: boolean
        liked: boolean
      }
      advancedValue: number[]
    }
    playerScore: {
      advancedOn: boolean
      standardValue: number[]
      advancedValue: boolean[]
    }
    animeScore: {
      advancedOn: boolean
      standardValue: number[]
      advancedValue: boolean[]
    }
    vintage: {
      standardValue: {
        years: number[]
        seasons: number[]
      }
      advancedValueList: any[]
    }
    type: {
      tv: boolean
      movie: boolean
      ova: boolean
      ona: boolean
      special: boolean
    }
    genre: any[]
    tags: any[]
  }
  soloMode: boolean
  passwordHidden: boolean
  _previewRoomTile: any
  createInviteLink(): string
  show(): void
  setup(genreInfo: any, tagInfo: any, savedSettings: any): void
  _settingStorage: SettingStorage
  numberOfSongsSliderCombo: SliderTextCombo
  genreFilter: DropDownSettingFilter
  tagFilter: DropDownSettingFilter
  setupRoomSize(): void
  roomSizeSliderCombo: SliderTextCombo
  setupShowSelection(): void
  inventorySizeSliderCombo: SliderTextCombo
  inventorySizeRangeSliderCombo: SliderTextCombo
  inventorySizeRandomSwitch: Switch
  lootingTimeSliderCombo: SliderTextCombo
  lootingTimeRangeSliderCombo: SliderTextCombo
  lootingTimeRandomSwitch: Switch
  setupScoring(): void
  lifeSliderCombo: SliderTextCombo
  setupAnswering(): void
  setupGameMode(): void
  setupTeamSize(): void
  setupSongSelection(): void
  watchedSliderCombo: SliderTextCombo
  unwatchedSliderCombo: SliderTextCombo
  randomWatchedSliderCombo: SliderTextCombo
  setupSongTypes(): void
  openingsSliderCombo: SliderTextCombo
  endingsSliderCombo: SliderTextCombo
  insertSliderCombo: SliderTextCombo
  randomSliderCombo: SliderTextCombo
  setupPlayLength(): void
  playLengthSliderCombo: SliderTextCombo
  playLengthRangeSliderCombo: SliderTextCombo
  playLengthRandomSwitch: Switch
  setupExtraGuessTime(): void
  extraGuessTimeSliderCombo: SliderTextCombo
  extraGuessTimeRangeSliderCombo: SliderTextCombo
  extraGuessTimeRandomSwitch: Switch
  setupPlaybackSpeed(): void
  playbackSpeedToggleSlider: ToggleSlider
  playbackSpeedRandomSwitch: Switch
  setupSamplePoint(): void
  samplePointRangeSliderCombo: SliderTextCombo
  samplePointRandomSwitch: Switch
  setupPlayerScore(): void
  playerScoreToggleSlider: ToggleSlider
  playerScoreAdvancedSwitch: Switch
  setupAnimeScore(): void
  animeScoreToggleSlider: ToggleSlider
  animeScoreAdvancedSwitch: Switch
  setupVintage(): void
  vintageRangeSliderCombo: SliderTextCombo
  fromSeasonSelector: SeasonSelector
  toSeasonSelector: SeasonSelector
  vintageAdvancedFilter: SettingFilter
  setupSongDifficulty(): void
  songDiffRangeSliderCombo: SliderTextCombo
  songDiffAdvancedSwitch: Switch
  setupSongPopularity(): void
  songPopRangeSliderCombo: SliderTextCombo
  songPopAdvancedSwitch: Switch
  showSettings(): void
  relayout(): void
  relayoutModeTab(): void
  relayoutGeneralTab(): void
  relayoutQuizTab(): void
  relayoutAnimeTab(): void
  getSettings(onlyValidateStaticSettings: any):
    | false
    | {
        roomName: string | number | string[]
        privateRoom: boolean
        password: string | number | string[]
        roomSize: any
        numberOfSongs: any
        teamSize: any
        modifiers: {
          skipGuessing: boolean
          skipReplay: boolean
          duplicates: boolean
          queueing: boolean
          lootDropping: boolean
          rebroadcastSongs: boolean
          dubSongs: boolean
        }
        songSelection: {
          standardValue: any
          advancedValue: {
            watched: any
            unwatched: any
            random: any
          }
        }
        watchedDistribution: any
        songType: {
          standardValue: {
            openings: boolean
            endings: boolean
            inserts: boolean
          }
          advancedValue: {
            openings: any
            endings: any
            inserts: any
            random: any
          }
        }
        openingCategories: {
          instrumental: boolean
          chanting: boolean
          character: boolean
          standard: boolean
        }
        endingCategories: {
          instrumental: boolean
          chanting: boolean
          character: boolean
          standard: boolean
        }
        insertCategories: {
          instrumental: boolean
          chanting: boolean
          character: boolean
          standard: boolean
        }
        guessTime: {
          randomOn: boolean
          standardValue: any
          randomValue: any
        }
        extraGuessTime: {
          randomOn: boolean
          standardValue: any
          randomValue: any
        }
        scoreType: any
        answeringMode: any
        showSelection: any
        inventorySize: {
          randomOn: boolean
          standardValue: any
          randomValue: any
        }
        lootingTime: {
          randomOn: boolean
          standardValue: any
          randomValue: any
        }
        lives: any
        samplePoint: {
          randomOn: boolean
          standardValue: any
          randomValue: any
        }
        playbackSpeed: {
          randomOn: boolean
          standardValue: any
          randomValue: any[]
        }
        songDifficulity: {
          advancedOn: boolean
          standardValue: {
            easy: boolean
            medium: boolean
            hard: boolean
          }
          advancedValue: any
        }
        songPopularity: {
          advancedOn: boolean
          standardValue: {
            disliked: boolean
            mixed: boolean
            liked: boolean
          }
          advancedValue: any
        }
        playerScore: {
          advancedOn: boolean
          standardValue: any
          advancedValue: any[]
        }
        animeScore: {
          advancedOn: boolean
          standardValue: any
          advancedValue: any[]
        }
        vintage: {
          standardValue: {
            years: any
            seasons: undefined[]
          }
          advancedValueList: any[]
        }
        type: {
          tv: boolean
          movie: boolean
          ova: boolean
          ona: boolean
          special: boolean
        }
        genre: any
        tags: any
        gameMode: any
      }
  hide(): void
  displayHostSolo(): void
  reset(): void
  setModeHostGame(soloMode: any): void
  gameMode: any
  setModeGameSettings(host: any, soloMode: any): void
  setModePreviewGame(tile: any): void
  resetMode(): void
  changeSettings(changes: any): void
  updateSetting(setting: any, change: any): void
  setCheckBox(checkBoxElement: any, checked: any): void
  changeView(viewName: any): void
  showLoadContainer(): void
  hideLoadContainer(): void
  toggleLoadContainer(): void
  toggleJoinButton(on: any): void
  saveSettings(): void
  randomizePlayerScore(): void
  randomizeAnimeScore(): void
  randomizeVintage(): void
  randomizeGenre(): void
  randomizeTag(): void
  updateSelectedGameMode(): void
  updateStandardSongSelection(): void
  setTickPopovers(textArray: any, $slider: any, $controller: any, defaultValue: any): void
  scrollToContainer(containerName: any): void
  getTutorialSettings(): any
  setPasswordHidden(hidden: any): void
  SHOW_SELECTION_IDS:
    | {
        AUTO: number
        LOOTING: number
      }
    | {
        AUTO: number
        LOOTING: number
      }
}
declare function createAdvancedDistributionSongListener(sliderComboList: any): (newValue: any, oldValue: any) => void
declare var hostModal: HostModal
