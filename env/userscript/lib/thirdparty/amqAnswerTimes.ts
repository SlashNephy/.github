// from: https://raw.githubusercontent.com/amq-script-project/AMQ-Scripts/master/gameplay/amqAnswerTimesUtility.user.js (MIT License)

import type { JoinGameEvent, PlayerAnsweredEvent } from '../../types/amq'

class AmqAnswerTimesUtility {
  public songStartTime = 0
  public playerTimes: number[] = []

  public constructor() {
    if (unsafeWindow.Listener === undefined) {
      return
    }

    new unsafeWindow.Listener('play next song', () => {
      this.songStartTime = Date.now()
      this.playerTimes = []
    }).bindListener()

    new unsafeWindow.Listener<PlayerAnsweredEvent>('player answered', (data) => {
      const time = Date.now() - this.songStartTime
      data.forEach((gamePlayerId) => {
        this.playerTimes[gamePlayerId] = time
      })
    }).bindListener()

    new unsafeWindow.Listener<JoinGameEvent>('Join Game', (data) => {
      const quizState = data.quizState
      if (quizState.songTimer > 0) {
        this.songStartTime = Date.now() - quizState.songTimer * 1000
      }
    }).bindListener()
  }

  public query(playerId: number): number | null {
    return playerId in this.playerTimes ? this.playerTimes[playerId] : null
  }
}

export const amqAnswerTimes = new AmqAnswerTimesUtility()
