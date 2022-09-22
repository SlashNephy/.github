// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    quiz?: {
      gameMode: string
      players: Record<
        number,
        {
          avatarInfo: {
            avatar: unknown
            background: unknown
          }
          avatarSlot: {
            $answerContainerText: JQuery
            _disabled: boolean
          }
          gamePlayerId: number
          hidden: undefined
          isSelf: boolean
          level: number
          lifeCountEnabled: boolean
          particleAnimation: unknown
          particleTrack: unknown
          points: number
          startPositionSlot: number
          teamNumber: number | null
          _groupNumber: number
          _host: boolean
          _inGame: boolean
          _name: string
          answer: string
          unknownAnswerNumber: number
          toggleTeamAnswerSharing(flag: boolean): void
        }
      >
      isSpectator: boolean
      answerInput: {
        showSubmitedAnswer(): void
        resetAnswerState(): void
      }
      videoTimerBar: {
        updateState(state: unknown): void
      }
      _playerAnswerListner: ReturnType<Window['Listener']>
    }
    quizVideoController?: {
      currentMoePlayerId: string
      moePlayers: Record<
        string,
        {
          $player: JQuery
          startPoint: number
        }
      >
    }
    options?: {
      $SETTING_TABS: JQuery
      $SETTING_CONTAINERS: JQuery
    }
    selfName?: string
    socialTab?: {
      // scripts/pages/gamePage/menuBar/socialStatus.js
      socialStatus?: {
        currentStatus: number
        changeSocialStatus(status: number): void
        getSocialStatusInfo(status: number): string
      }
    }
    // scripts/pages/gamePage/shared/listener.js
    Listener?: new <E = unknown>(command: string, callback: (event: E) => void) => {
      command: string
      // eslint-disable-next-line @typescript-eslint/method-signature-style
      callback: (event: E) => void
      bound: boolean
      fire(event: E): void
      bindListener(): void
      unbindListener(): void
    }
    // scripts/pages/gamePage/shared/socket.js
    socket?: {
      _socket: Window['socket']
      listners: Record<string, (event: unknown) => void>
      _disconnected: boolean
      _sessionId: number | undefined
      _attempReconect: boolean
      setup(): void
      addListerner<T>(command: string, listener: (event: T) => void): void
      removeListener<T>(command: string, listener: (event: T) => void): void
      sendCommand<T>(content: { command: string } & Record<string, unknown>, responseHandler?: (event: T) => void): void
    }
  }
}

export type AnswerResultsEvent = {
  players: {
    correctGuesses: number
    answerNumber: number | undefined
    gamePlayerId: number
    pose: number
    level: number
    correct: boolean
    score: number
    listStatus: number
    showScore: number
    position: number
    positionSlot: number
  }[]
  songInfo: {
    animeNames: { english: string; romaji: string }
    artist: string
    songName: string
    urlMap: {
      catbox?: { 0?: string; 480?: string; 720?: string }
      openingsmoe?: { 0?: string; 480?: string; 720?: string }
    }
    type: number
    typeNumber: number
    annId: number
    highRisk: number
    animeScore: number
    animeType: string
    vintage: string
    animeDifficulty: number
    animeTags: string[]
    animeGenre: string[]
    altAnimeNames: string[]
    altAnimeNamesAnswers: string[]
    siteIds: { annId: number; malId: number; kitsuId: number; aniListId: number }
  }
  progressBarState: { length: number; played: number }
  groupMap: Record<string, number[]>
  watched: boolean
}

export type GameStartingEvent = {
  gameMode: string
  groupSlotMap: Record<number, number[]>
  players: {
    avatarInfo: {
      avatar: {
        active: number
        avatarId: number
        avatarName: string
        backgroundFileName: string
        characterId: number
        colorActive: number
        colorId: number
        colorName: string
        editor: string
        optionActive: boolean
        optionName: string
        outfitName: string
        sizeModifier: number
      }
      background: {
        avatarId: number
        avatarName: string
        backgroundHori: string
        backgroundVert: string
        colorId: number
        outfitName: string
      }
    }
    gamePlayerId: number
    host: boolean
    inGame: boolean
    level: number
    name: string
    pose: number
    position: number
    positionSlot: number
    score: number
    teamCaptain: null
    teamNumber: number | null
    teamPlayer: null
  }[]
  showSelection: number
}

export type PlayerAnsweredEvent = number[]

export type JoinGameEvent = {
  quizState: {
    songTimer: number
  }
}

export type PlayerAnswersEvent = {
  answers: {
    gamePlayerId: number
    answer: string
    answerNumber: number
  }[]
  progressBarState: unknown
}

export type PlayerProfileEvent = {
  allBadges: unknown[]
  avatar: {
    avatarName: string
    colorName: string
    optionActive: number
    optionName: string
    outfitName: string
  }
  avatarProfileImage: number
  badges: {
    filename: string
    id: number
    name: string
    slot: number
    special: boolean
    type: number
    unlockDescription: string
  }[]
  creationDate: {
    hidden: boolean
    value: string
    adminView: boolean
  }
  guessPercent: {
    hidden: boolean
    value: string
    adminView: boolean
  }
  level: number
  list: {
    hidden: boolean
    listId: 1 | 2 | 3
    listUser: string | null
    listUserUrl: string | null
    adminView: boolean
  }
  name: string
  originalName: string
  profileEmoteId: null
  songCount: {
    hidden: boolean
    value: number
    adminView: boolean
  }
}
