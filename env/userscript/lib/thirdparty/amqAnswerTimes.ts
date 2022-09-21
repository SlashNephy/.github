// from: https://raw.githubusercontent.com/amq-script-project/AMQ-Scripts/master/gameplay/amqAnswerTimesUtility.user.js (MIT License)

import type { JoinGameEvent, PlayerAnsweredEvent } from '../../types/amq'

class AmqAnswerTimesUtility {
  private songStartTime = 0
  private readonly times: number[] = []

  public constructor() {
    if (unsafeWindow.Listener === undefined) {
      throw new Error('Listener is not defined.')
    }

    new unsafeWindow.Listener('play next song', this._onPlayNextSong).bindListener()
    new unsafeWindow.Listener('player answered', this._onPlayerAnswered).bindListener()
    new unsafeWindow.Listener('Join Game', this._onJoinGame).bindListener()
  }

  public query(playerId: number): number | null {
    return playerId in this.times ? this.times[playerId] : null
  }

  private _onPlayNextSong() {
    this.songStartTime = Date.now()
    this.times.splice(0)
  }

  private _onPlayerAnswered(playerIds: PlayerAnsweredEvent) {
    const time = Date.now() - this.songStartTime
    for (const id of playerIds) {
      this.times[id] = time
    }
  }

  private _onJoinGame({ quizState }: JoinGameEvent) {
    if (quizState.songTimer > 0) {
      this.songStartTime = Date.now() - quizState.songTimer * 1000
    }
  }
}

export const amqAnswerTimes = new AmqAnswerTimesUtility()
