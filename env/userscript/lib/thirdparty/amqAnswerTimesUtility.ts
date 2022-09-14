// from: https://raw.githubusercontent.com/amq-script-project/AMQ-Scripts/master/gameplay/amqAnswerTimesUtility.user.js (MIT License)

class AmqAnswerTimesUtility {
  public songStartTime = 0
  public playerTimes: number[] = []

  public constructor() {
    if (typeof Listener === 'undefined') {
      return
    }

    new Listener('play next song', () => {
      this.songStartTime = Date.now()
      this.playerTimes = []
    }).bindListener()

    new Listener<number[]>('player answered', (data) => {
      const time = Date.now() - this.songStartTime
      data.forEach((gamePlayerId) => {
        this.playerTimes[gamePlayerId] = time
      })
    }).bindListener()

    new Listener<{ quizState: { songTimer: number } }>('Join Game', (data) => {
      const quizState = data.quizState
      if (quizState.songTimer > 0) {
        this.songStartTime = Date.now() - quizState.songTimer * 1000
      }
    }).bindListener()
  }
}

export const amqAnswerTimesUtility = new AmqAnswerTimesUtility()
