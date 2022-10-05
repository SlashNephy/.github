// from: https://raw.githubusercontent.com/amq-script-project/AMQ-Scripts/master/gameplay/amqAnswerTimesUtility.user.js (MIT License)

import { isAmqReady } from '../amq'

class AmqAnswerTimesUtility {
  public songStartTime = 0
  public playerTimes: number[] = []
  public firstPlayers: number[] = []

  public constructor() {
    if (!isAmqReady()) {
      return
    }

    new Listener('play next song', () => {
      this.songStartTime = Date.now()
      this.playerTimes = []
      this.firstPlayers = []
    }).bindListener()

    new Listener('player answered', (playerIds) => {
      const time = Date.now() - this.songStartTime

      if (this.playerTimes.length === 0) {
        this.firstPlayers.push(...playerIds)
      }

      for (const id of playerIds) {
        this.playerTimes[id] = time
      }
    }).bindListener()

    new Listener('Join Game', ({ quizState }) => {
      if (quizState.songTimer > 0) {
        this.songStartTime = Date.now() - quizState.songTimer * 1000
      }
    }).bindListener()
  }

  public query(playerId: number): number | null {
    return playerId in this.playerTimes ? this.playerTimes[playerId] : null
  }

  public isFirst(playerId: number): boolean {
    return playerId in this.firstPlayers
  }
}

export const amqAnswerTimes = new AmqAnswerTimesUtility()
