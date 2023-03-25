declare function SettingRandomizer(): void
declare class SettingRandomizer {
  _RANGE_TYPES: {
    INTEGER: number
    INTEGER_PAIR: number
    INTEGER_SET: number
    BOOLEAN_ARRAY: number
    BOOLEAN_MAP: number
  }
  generalSettingRanges: {
    numberOfSongs: {
      min: number
      max: number
    }
    songSelection: {
      advanced: boolean
      standardValue: {
        min: number
        max: number
      }
      advancedValue: {
        fields: string[]
      }
    }
    songType: {
      advanced: boolean
      standardValue: {
        fields: string[]
      }
      advancedValue: {
        fields: string[]
      }
    }
  }
  quizSettingRanges: {
    guessTime: {
      random: boolean
      standardValue: {
        type: number
        min: number
        max: number
      }
      randomValue: {
        type: number
        min: number
        max: number
      }
    }
    extraGuessTime: {
      random: boolean
      standardValue: {
        type: number
        min: number
        max: number
      }
      randomValue: {
        type: number
        min: number
        max: number
      }
    }
    samplePoint: {
      random: boolean
      standardValue: {
        type: number
        min: number
        max: number
      }
      randomValue: {
        type: number
        min: number
        max: number
      }
    }
    playbackSpeed: {
      random: boolean
      standardValue: {
        type: number
        set: number[]
      }
      randomValue: {
        type: number
        size: number
        atLeastOneRandom: boolean
      }
    }
    songDifficulity: {
      advanced: boolean
      standardValue: {
        type: number
        fields: string[]
        atLeastOneRandom: boolean
      }
      advancedValue: {
        type: number
        min: number
        max: number
        minRange: number
      }
    }
    songPopularity: {
      advanced: boolean
      standardValue: {
        type: number
        fields: string[]
        atLeastOneRandom: boolean
      }
      advancedValue: {
        type: number
        min: number
        max: number
        minRange: number
      }
    }
  }
  animeSettingRange: {
    playerScore: {
      advanced: boolean
      standardValue: {
        type: number
        min: number
        max: number
        minRange: number
      }
      advancedValue: {
        type: number
        size: number
        atLeastOneRandom: boolean
      }
    }
    type: {
      type: number
      fields: string[]
      atLeastOneRandom: boolean
    }
  }
  _ANIME_SCORE_CONSTANTS: {
    RANGE: {
      min: number
      max: number
    }
    MAIN_RANGE: {
      min: number
      max: number
    }
  }
  _VINTAGE_CONSTANTS: {
    RANGE: {
      YEARS: {
        min: number
        max: number
      }
      SEASONS: {
        min: number
        max: number
      }
    }
    WEIGHTED_YEARS: {
      1944: number
      1980: number
      1990: number
      2000: number
      2010: number
      2023: number
    }
  }
  _MAX_TAG_GENRE_FILTER_AMOUNT: number
  _GENRE_TAG_STATES: {
    INCLUDE: number
    EXLUCDE: number
    OPTIONAL: number
  }
  _genreIds: any[]
  _tagIds: any[]
  setup(genreList: any, tagList: any): void
  getRandomGeneralSettings(): {
    numberOfSongs: any
    songSelection: {
      advancedOn: boolean
      standardValue: any
      advancedValue: {}
    }
    songType: {
      standardValue: {}
      advancedOn: boolean
      advancedValue: {
        random: any
      }
    }
  }
  getRandomQuizSettings(): {}
  getRandomAnimeSettings(): {
    animeScore: {
      advancedOn: boolean
      standardValue: any[]
      advancedValue: boolean[]
    }
    vintage: {
      standardValue: {
        years: any[]
        seasons: any[]
      }
      advancedValueList: any[]
    }
    genre: {
      id: any
      state: number
    }[]
    tags: {
      id: any
      state: number
    }[]
  }
  getRandomSongSelection(numberOfSongs: any): {
    advancedOn: boolean
    standardValue: any
    advancedValue: {}
  }
  getRandomSongType(numberOfSongs: any): {
    standardValue: {}
    advancedOn: boolean
    advancedValue: {
      random: any
    }
  }
  getRandomAnimeScoreSetting(): {
    advancedOn: boolean
    standardValue: any[]
    advancedValue: boolean[]
  }
  getRandomVintageSetting(): {
    standardValue: {
      years: any[]
      seasons: any[]
    }
    advancedValueList: any[]
  }
  randomVintage(useWeightedSeason: any): {
    years: any[]
    seasons: any[]
  }
  randomTagGenreFilters(
    list: any,
    onlyExclude: any
  ): {
    id: any
    state: number
  }[]
  getNewFromList(list: any, alreadySelectedList: any): any
  parseSettingRange(settingRange: any): {
    standardValue: any
    randomOn: boolean
    randomValue: any
    advancedOn: boolean
    advancedValue: any
  }
  parseSettingValue(value: any): any
  getRandomInteger(min: any, max: any): any
  getRandomIntegerPair(min: any, max: any): any[]
  randomBoolean(): boolean
  selectRandomFromList(list: any): any
  getRandomBooleanArray(length: any, atLeastOneRandom: any): boolean[]
}
declare var settingRandomizer: SettingRandomizer
