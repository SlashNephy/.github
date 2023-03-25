declare function SettingSerilizer(): void
declare class SettingSerilizer {
  _DATA_FORMATS: {
    SMALL_INT: number
    BIG_INT: number
    BOOLEAN: number
    PAIR_SMALL_INT: number
    PAIR_BIG_INT: number
    PAIR_LARGE_INT: number
    QUAD_BOOLEAN: number
    NINE_BOOLEAN: number
    TEN_BOOLEAN: number
    ARRAY_VINTAGE_SET: number
    ARRAY_TAG_GENRE_ENTRY: number
  }
  _SETTING_SCHEMEAS: {
    1: {
      BASE: number
      ARRAY_DELIMITER: string
      MAX_LENGTH: number
      SCHEMA: {
        roomSize: number
        numberOfSongs: number
        modifiers: {
          skipGuessing: number
          skipReplay: number
          queueing: number
          duplicates: number
        }
        songSelection: {
          advancedOn: number
          standardValue: number
          advancedValue: {
            watched: number
            unwatched: number
            random: number
          }
        }
        songType: {
          advancedOn: number
          standardValue: {
            openings: number
            endings: number
            inserts: number
          }
          advancedValue: {
            openings: number
            endings: number
            inserts: number
            random: number
          }
        }
        guessTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        samplePoint: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        playbackSpeed: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        songDifficulity: {
          advancedOn: number
          standardValue: {
            easy: number
            medium: number
            hard: number
          }
          advancedValue: number
        }
        songPopularity: {
          advancedOn: number
          standardValue: {
            disliked: number
            mixed: number
            liked: number
          }
          advancedValue: number
        }
        playerScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        animeScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        vintage: {
          standardValue: {
            years: number
            seasons: number
          }
          advancedValueList: number
        }
        type: {
          tv: number
          movie: number
          ova: number
          ona: number
          special: number
        }
        genre: number
        tags: number
      }
    }
    2: {
      BASE: number
      ARRAY_DELIMITER: string
      MAX_LENGTH: number
      SCHEMA: {
        roomSize: number
        numberOfSongs: number
        modifiers: {
          skipGuessing: number
          skipReplay: number
          queueing: number
          duplicates: number
          lootDropping: number
        }
        songSelection: {
          advancedOn: number
          standardValue: number
          advancedValue: {
            watched: number
            unwatched: number
            random: number
          }
        }
        songType: {
          advancedOn: number
          standardValue: {
            openings: number
            endings: number
            inserts: number
          }
          advancedValue: {
            openings: number
            endings: number
            inserts: number
            random: number
          }
        }
        guessTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        inventorySize: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lootingTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lives: number
        samplePoint: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        playbackSpeed: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        songDifficulity: {
          advancedOn: number
          standardValue: {
            easy: number
            medium: number
            hard: number
          }
          advancedValue: number
        }
        songPopularity: {
          advancedOn: number
          standardValue: {
            disliked: number
            mixed: number
            liked: number
          }
          advancedValue: number
        }
        playerScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        animeScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        vintage: {
          standardValue: {
            years: number
            seasons: number
          }
          advancedValueList: number
        }
        type: {
          tv: number
          movie: number
          ova: number
          ona: number
          special: number
        }
        genre: number
        tags: number
      }
    }
    3: {
      BASE: number
      ARRAY_DELIMITER: string
      MAX_LENGTH: number
      SCHEMA: {
        roomSize: number
        numberOfSongs: number
        teamSize: number
        modifiers: {
          skipGuessing: number
          skipReplay: number
          queueing: number
          duplicates: number
          lootDropping: number
        }
        songSelection: {
          standardValue: number
          advancedValue: {
            watched: number
            unwatched: number
            random: number
          }
        }
        songType: {
          standardValue: {
            openings: number
            endings: number
            inserts: number
          }
          advancedValue: {
            openings: number
            endings: number
            inserts: number
            random: number
          }
        }
        guessTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        scoreType: number
        showSelection: number
        inventorySize: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lootingTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lives: number
        samplePoint: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        playbackSpeed: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        songDifficulity: {
          advancedOn: number
          standardValue: {
            easy: number
            medium: number
            hard: number
          }
          advancedValue: number
        }
        songPopularity: {
          advancedOn: number
          standardValue: {
            disliked: number
            mixed: number
            liked: number
          }
          advancedValue: number
        }
        playerScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        animeScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        vintage: {
          standardValue: {
            years: number
            seasons: number
          }
          advancedValueList: number
        }
        type: {
          tv: number
          movie: number
          ova: number
          ona: number
          special: number
        }
        genre: number
        tags: number
      }
    }
    4: {
      BASE: number
      ARRAY_DELIMITER: string
      MAX_LENGTH: number
      SCHEMA: {
        roomSize: number
        numberOfSongs: number
        teamSize: number
        modifiers: {
          skipGuessing: number
          skipReplay: number
          queueing: number
          duplicates: number
          lootDropping: number
          rebroadcastSongs: number
          dubSongs: number
        }
        songSelection: {
          standardValue: number
          advancedValue: {
            watched: number
            unwatched: number
            random: number
          }
        }
        songType: {
          standardValue: {
            openings: number
            endings: number
            inserts: number
          }
          advancedValue: {
            openings: number
            endings: number
            inserts: number
            random: number
          }
        }
        guessTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        scoreType: number
        showSelection: number
        inventorySize: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lootingTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lives: number
        samplePoint: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        playbackSpeed: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        songDifficulity: {
          advancedOn: number
          standardValue: {
            easy: number
            medium: number
            hard: number
          }
          advancedValue: number
        }
        songPopularity: {
          advancedOn: number
          standardValue: {
            disliked: number
            mixed: number
            liked: number
          }
          advancedValue: number
        }
        playerScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        animeScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        vintage: {
          standardValue: {
            years: number
            seasons: number
          }
          advancedValueList: number
        }
        type: {
          tv: number
          movie: number
          ova: number
          ona: number
          special: number
        }
        genre: number
        tags: number
      }
    }
    5: {
      BASE: number
      ARRAY_DELIMITER: string
      MAX_LENGTH: number
      SCHEMA: {
        roomSize: number
        numberOfSongs: number
        teamSize: number
        modifiers: {
          skipGuessing: number
          skipReplay: number
          queueing: number
          duplicates: number
          lootDropping: number
          rebroadcastSongs: number
          dubSongs: number
        }
        songSelection: {
          standardValue: number
          advancedValue: {
            watched: number
            unwatched: number
            random: number
          }
        }
        songType: {
          standardValue: {
            openings: number
            endings: number
            inserts: number
          }
          advancedValue: {
            openings: number
            endings: number
            inserts: number
            random: number
          }
        }
        insertCategories: {
          instrumental: number
          chanting: number
          character: number
          standard: number
        }
        guessTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        scoreType: number
        showSelection: number
        inventorySize: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lootingTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lives: number
        samplePoint: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        playbackSpeed: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        songDifficulity: {
          advancedOn: number
          standardValue: {
            easy: number
            medium: number
            hard: number
          }
          advancedValue: number
        }
        songPopularity: {
          advancedOn: number
          standardValue: {
            disliked: number
            mixed: number
            liked: number
          }
          advancedValue: number
        }
        playerScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        animeScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        vintage: {
          standardValue: {
            years: number
            seasons: number
          }
          advancedValueList: number
        }
        type: {
          tv: number
          movie: number
          ova: number
          ona: number
          special: number
        }
        genre: number
        tags: number
      }
    }
    6: {
      BASE: number
      ARRAY_DELIMITER: string
      MAX_LENGTH: number
      SCHEMA: {
        roomSize: number
        numberOfSongs: number
        teamSize: number
        modifiers: {
          skipGuessing: number
          skipReplay: number
          queueing: number
          duplicates: number
          lootDropping: number
          rebroadcastSongs: number
          dubSongs: number
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
            openings: number
            endings: number
            inserts: number
          }
          advancedValue: {
            openings: number
            endings: number
            inserts: number
            random: number
          }
        }
        insertCategories: {
          instrumental: number
          chanting: number
          character: number
          standard: number
        }
        guessTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        scoreType: number
        showSelection: number
        inventorySize: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lootingTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lives: number
        samplePoint: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        playbackSpeed: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        songDifficulity: {
          advancedOn: number
          standardValue: {
            easy: number
            medium: number
            hard: number
          }
          advancedValue: number
        }
        songPopularity: {
          advancedOn: number
          standardValue: {
            disliked: number
            mixed: number
            liked: number
          }
          advancedValue: number
        }
        playerScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        animeScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        vintage: {
          standardValue: {
            years: number
            seasons: number
          }
          advancedValueList: number
        }
        type: {
          tv: number
          movie: number
          ova: number
          ona: number
          special: number
        }
        genre: number
        tags: number
      }
    }
    7: {
      BASE: number
      ARRAY_DELIMITER: string
      MAX_LENGTH: number
      SCHEMA: {
        roomSize: number
        numberOfSongs: number
        teamSize: number
        modifiers: {
          skipGuessing: number
          skipReplay: number
          queueing: number
          duplicates: number
          lootDropping: number
          rebroadcastSongs: number
          dubSongs: number
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
            openings: number
            endings: number
            inserts: number
          }
          advancedValue: {
            openings: number
            endings: number
            inserts: number
            random: number
          }
        }
        openingCategories: {
          instrumental: number
          chanting: number
          character: number
          standard: number
        }
        endingCategories: {
          instrumental: number
          chanting: number
          character: number
          standard: number
        }
        insertCategories: {
          instrumental: number
          chanting: number
          character: number
          standard: number
        }
        guessTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        scoreType: number
        showSelection: number
        inventorySize: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lootingTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lives: number
        samplePoint: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        playbackSpeed: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        songDifficulity: {
          advancedOn: number
          standardValue: {
            easy: number
            medium: number
            hard: number
          }
          advancedValue: number
        }
        songPopularity: {
          advancedOn: number
          standardValue: {
            disliked: number
            mixed: number
            liked: number
          }
          advancedValue: number
        }
        playerScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        animeScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        vintage: {
          standardValue: {
            years: number
            seasons: number
          }
          advancedValueList: number
        }
        type: {
          tv: number
          movie: number
          ova: number
          ona: number
          special: number
        }
        genre: number
        tags: number
      }
    }
    8: {
      BASE: number
      ARRAY_DELIMITER: string
      MAX_LENGTH: number
      SCHEMA: {
        roomSize: number
        numberOfSongs: number
        teamSize: number
        modifiers: {
          skipGuessing: number
          skipReplay: number
          queueing: number
          duplicates: number
          lootDropping: number
          rebroadcastSongs: number
          dubSongs: number
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
            openings: number
            endings: number
            inserts: number
          }
          advancedValue: {
            openings: number
            endings: number
            inserts: number
            random: number
          }
        }
        openingCategories: {
          instrumental: number
          chanting: number
          character: number
          standard: number
        }
        endingCategories: {
          instrumental: number
          chanting: number
          character: number
          standard: number
        }
        insertCategories: {
          instrumental: number
          chanting: number
          character: number
          standard: number
        }
        guessTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        extraGuessTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        scoreType: number
        showSelection: number
        inventorySize: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lootingTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lives: number
        samplePoint: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        playbackSpeed: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        songDifficulity: {
          advancedOn: number
          standardValue: {
            easy: number
            medium: number
            hard: number
          }
          advancedValue: number
        }
        songPopularity: {
          advancedOn: number
          standardValue: {
            disliked: number
            mixed: number
            liked: number
          }
          advancedValue: number
        }
        playerScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        animeScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        vintage: {
          standardValue: {
            years: number
            seasons: number
          }
          advancedValueList: number
        }
        type: {
          tv: number
          movie: number
          ova: number
          ona: number
          special: number
        }
        genre: number
        tags: number
      }
    }
    9: {
      BASE: number
      ARRAY_DELIMITER: string
      MAX_LENGTH: number
      SCHEMA: {
        roomSize: number
        numberOfSongs: number
        teamSize: number
        modifiers: {
          skipGuessing: number
          skipReplay: number
          queueing: number
          duplicates: number
          lootDropping: number
          rebroadcastSongs: number
          dubSongs: number
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
            openings: number
            endings: number
            inserts: number
          }
          advancedValue: {
            openings: number
            endings: number
            inserts: number
            random: number
          }
        }
        openingCategories: {
          instrumental: number
          chanting: number
          character: number
          standard: number
        }
        endingCategories: {
          instrumental: number
          chanting: number
          character: number
          standard: number
        }
        insertCategories: {
          instrumental: number
          chanting: number
          character: number
          standard: number
        }
        guessTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        extraGuessTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        scoreType: number
        showSelection: number
        answeringMode: number
        inventorySize: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lootingTime: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        lives: number
        samplePoint: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        playbackSpeed: {
          randomOn: number
          standardValue: number
          randomValue: number
        }
        songDifficulity: {
          advancedOn: number
          standardValue: {
            easy: number
            medium: number
            hard: number
          }
          advancedValue: number
        }
        songPopularity: {
          advancedOn: number
          standardValue: {
            disliked: number
            mixed: number
            liked: number
          }
          advancedValue: number
        }
        playerScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        animeScore: {
          advancedOn: number
          standardValue: number
          advancedValue: number
        }
        vintage: {
          standardValue: {
            years: number
            seasons: number
          }
          advancedValueList: number
        }
        type: {
          tv: number
          movie: number
          ova: number
          ona: number
          special: number
        }
        genre: number
        tags: number
      }
    }
  }
  _NEWEST_VERSION: number
  _VERSION_BASE: number
  encode(settings: any): string
  encodeObject(object: any, schema: any, base: any, delimiter: any): string
  encodeValue(value: any, dataType: any, base: any, arrayDelimiter: any): string
  encodeInteger(value: any, base: any, encodeSize: any): string
  encodeBooleanArray(array: any, expectedLength: any): string
  decode(encodedString: any): {
    insertCategories: {
      instrumental: boolean
      chanting: boolean
      character: boolean
      standard: boolean
    }
    watchedDistribution: number
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
    extraGuessTime: {
      randomOn: boolean
      standardValue: number
      randomValue: number[]
    }
    answeringMode: number
  }
  decodeObject(
    encodedStringContainer: any,
    schema: any,
    base: any,
    arrayDelimiter: any,
    versionNumber: any
  ): {
    insertCategories: {
      instrumental: boolean
      chanting: boolean
      character: boolean
      standard: boolean
    }
    watchedDistribution: number
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
    extraGuessTime: {
      randomOn: boolean
      standardValue: number
      randomValue: number[]
    }
    answeringMode: number
  }
  decodeValue(encodedStringContainer: any, dataType: any, base: any, arrayDelimiter: any): any
  decodeInteger(encodedString: any, base: any): number
  decodeIntegerPair(stringContainer: any, base: any, intEncodeSize: any): number[]
  extractEncodedString(stringContainer: any, encodeLength: any): any
  decodeBooleanArray(stringContainer: any, arrayLength: any): boolean[]
}
