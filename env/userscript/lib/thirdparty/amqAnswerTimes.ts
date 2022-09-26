// from: https://raw.githubusercontent.com/amq-script-project/AMQ-Scripts/master/gameplay/amqAnswerTimesUtility.user.js (MIT License)

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

    new unsafeWindow.Listener('player answered', (playerIds) => {
      const time = Date.now() - this.songStartTime
      for (const id of playerIds) {
        this.playerTimes[id] = time
      }
    }).bindListener()

    new unsafeWindow.Listener('Join Game', ({ quizState }) => {
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
