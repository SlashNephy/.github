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
          teamNumber: null
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
      _playerAnswerListner: Listener
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
    socialTab?: {
      socialStatus?: {
        currentStatus: number
        changeSocialStatus(status: number): void
      }
    }
    Listener?: new <E = unknown>(command: string, callback: (event: E) => void) => Listener
    selfName?: string
  }
}

type Listener = {
  fire(event: E): void
  bindListener(): void
  unbindListener(): void
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
  players: {
    name: string
    teamNumber?: number
    gamePlayerId: number
  }[]
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
