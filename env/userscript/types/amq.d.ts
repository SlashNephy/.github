// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
// noinspection JSUnusedGlobalSymbols

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    quiz: Quiz
    quizVideoController: QuizVideoController
    options: Options
    setupDocumentDone?: boolean
    selfName: string
    socialTab: SocialTab
    socket: Socket
  }

  declare function displayMessage(
    title: string,
    msg: string,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    callback: () => void = () => {},
    outsideDismiss = true,
    disableSWAL = false
  ): void
}

// scripts/pages/gamePage/game/quiz/quiz.js
declare global {
  declare class Quiz {
    // incomplete
    public gameMode: string

    public players: Record<
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

    public isSpectator: boolean

    public answerInput?: {
      $input: JQuery
      typingInput: QuizTypeAnswerInput
      showSubmitedAnswer(): void
      resetAnswerState(): void
      submitAnswer()
    }

    public videoTimerBar: {
      updateState(state: unknown): void
    }

    public _playerAnswerListner: ReturnType<Window['Listener']>

    public infoContainer: {
      $extraAnimeNameContent: HTMLElement | string
      fitTextToContainer()
    }

    public nextSongPlayLength: number
  }
}

declare global {
  declare class QuizTypeAnswerInput {
    public autoCompleteController: AutoCompleteController
  }
}

// scripts/pages/gamePage/menuBar/socialStatus.js
declare global {
  declare class SocialStatus {
    public $entry: JQuery

    public currentStatus: number

    public STATUS_IDS: {
      ONLINE: number
      DO_NO_DISTURB: number
      AWAY: number
      INVISIBLE: number
    }

    public constructor($entry: JQuery)

    public changeSocialStatus(status: number): void

    public getSocialStatusInfo(status: number): string
  }
}

// scripts/pages/gamePage/menuBar/socialTab.js
declare global {
  declare class SocialTab {
    // incomplete
    public socialStatus?: SocialStatus
  }
}

// scripts/pages/gamePage/shared/socket.js
declare global {
  declare class Socket {
    public _socket: unknown

    public listners: { [command in keyof EventMap]: (event: EventMap[command]) => void }

    public _disconnected: boolean

    public _sessionId: number | undefined

    public _attempReconect: boolean

    public setup(): void

    public addListerner<C extends keyof EventMap>(command: C, listener: (event: EventMap[C]) => void): void

    public removeListener<C extends keyof EventMap>(command: C, listener: (event: EventMap[C]) => void): void

    public sendCommand<C extends keyof EventMap>(
      content: { command: C } & Record<string, unknown>,
      responseHandler?: (event: EventMap[C]) => void
    ): void
  }
}

// scripts/pages/gamePage/shared/listener.js
declare global {
  declare class Listener<C extends keyof EventMap> {
    public command: C

    public callback: (event: EventMap[C]) => void

    public bound: boolean

    public constructor(command: C, callback: (event: EventMap[C]) => void)

    public fire(event: EventMap[C]): void

    public bindListener(): void

    public unbindListener(): void
  }
}

// scripts/pages/gamePage/settings/options.js
declare global {
  declare class Options {
    // incomplete
    public $SETTING_TABS: JQuery

    public $SETTING_CONTAINERS: JQuery
  }
}

declare class QuizVideoController {
  // incomplete
  public currentMoePlayerId: string

  public moePlayers: Record<
    string,
    {
      $player: JQuery<HTMLVideoElement>
      startPoint: number
    }
  >

  public getCurrentPlayer(): MoeVideoPlayer | undefined
}

declare class MoeVideoPlayer {
  public $player: JQuery<HTMLVideoElement>

  public player: {
    hasClass(name: string): boolean
    isAudio(): boolean
  }
}

declare class QuizAnswerState {
  public $SENDING_CONTAINER: JQuery

  public $ANSWER_CHECK: JQuery

  public $OUTER_CONTAINER: JQuery

  public $INNER_CONTAINER: JQuery

  public $INPUT: JQuery

  public loadingInterval?: number

  public currentAnswer: null | undefined

  public submittedAnswer: null

  public popoverContent: unknown

  public answerListener: ReturnType<Exclude<Window['Listener'], undefined>>

  public constructor($input: JQuery)

  public startListner()

  public stopListener()

  public startLoad()

  public stopLoad()

  public show()

  public hide()

  public showCheck()

  public hideCheck()

  public submitAnswer(answer: unknown, showState: boolean, noLoad: boolean)

  public reset()

  public toggleFade(on: boolean)

  public setInputToAnswer()

  public answerSubmited()
}

declare class AmqAwesomeplete {
  public searchId: number

  public currentSubList: unknown[] | null

  public _list: unknown[] | null

  public letterLists: Record<string, unknown[]>

  public currentQuery: string

  public $ul: JQuery

  public minChars: number

  public index: number

  public constructor(input: unknown, o: unknown, scrollable: boolean)

  public item(text: string, input: string, item_id: string): HTMLLIElement

  public evaluate()
}

declare class AutoCompleteController {
  public $input: JQuery

  public list: string[]

  public version: number

  public awesomepleteInstance?: AmqAwesomeplete

  public constructor($input: JQuery)

  public updateList()

  public newList()

  public hide()
}

declare class QuizAnswerInput {
  public skipController: unknown

  public $input: JQuery

  public $inputContainer: JQuery

  public quizAnswerState: QuizAnswerState

  public autoCompleteController: AutoCompleteController

  public gotTeamAnswer: boolean

  public _inFocus: boolean

  public constructor(skipController: unknown)

  public get inFocus(): boolean

  public set inFocus(newValue: boolean)

  // eslint-disable-next-line accessor-pairs
  public set active(newValue: boolean)

  public displayAnswer(answer: unknown)

  public setNewAnswer(answer: unknown)

  public submitAnswer(showState: boolean)

  public showSubmitedAnswer()

  public handleGuessPhaseOver()

  public disable()

  public enable()

  public clear()

  public updateAutocomplete()

  public resetAnswerState()
}

export type EventMap = Record<string, never> & {
  'answer results': AnswerResultsEvent
  'Game Starting': GameStartingEvent
  'player answered': PlayerAnsweredEvent
  'Join Game': JoinGameEvent
  'player answers': PlayerAnswersEvent
  'player profile': PlayerProfileEvent
  'play next song': unknown
  'expandLibrary questions': ExpandLibraryQuestionsEvent
  'get all song names': GetAllSongNamesEvent
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

export type ExpandLibraryQuestionsEvent = {
  success: boolean
  questions: {
    annId: number
    name: string
    songs: {
      annSongId: number
      artist: string
      examples: Record<string, string>
      name: string
      number: number
      type: number
      versions: {
        open: Record<string, Record<string, number>>
        closed: {
          resolution: number | null
          status: number
        }
      }
    }[]
  }[]
}

export type GetAllSongNamesEvent = {
  names: string[]
  version: number
}
