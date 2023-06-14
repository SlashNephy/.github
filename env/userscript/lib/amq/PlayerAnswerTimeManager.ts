import { isReady } from './isReady'

export class PlayerAnswerTimeManager {
  #songStartTime = 0

  #playerTimes: number[] = []

  #firstPlayers: number[] = []

  public constructor() {
    if (!isReady()) {
      throw new Error('AMQ is not ready.')
    }

    new Listener('play next song', () => {
      this.#songStartTime = Date.now()
      this.#playerTimes = []
      this.#firstPlayers = []
    }).bindListener()

    new Listener('player answered', (playerIds) => {
      const time = Date.now() - this.#songStartTime

      if (this.#firstPlayers.length === 0) {
        this.#firstPlayers.push(...playerIds)
      }

      for (const id of playerIds) {
        this.#playerTimes[id] = time
      }
    }).bindListener()

    new Listener('Join Game', ({ quizState }) => {
      if (quizState.songTimer > 0) {
        this.#songStartTime = Date.now() - quizState.songTimer * 1000
      }
    }).bindListener()
  }

  public query(playerId: number): number | null {
    return this.#playerTimes[playerId] ?? null
  }

  public isFirst(playerId: number): boolean {
    return this.#firstPlayers.includes(playerId)
  }
}
