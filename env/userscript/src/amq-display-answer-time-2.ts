import { onReady } from '../lib/amq/onReady'
import { PlayerAnswerTimeManager } from '../lib/amq/PlayerAnswerTimeManager'

onReady(() => {
  const ignoredPlayerIds: number[] = []
  const playerAnswers = new PlayerAnswerTimeManager()

  const formatAnswerTime = (playerId: number): string | null => {
    const time = playerAnswers.query(playerId)
    if (time === null) {
      return null
    }

    const isLightning = playerAnswers.isFirst(playerId)
    return `${isLightning ? '⚡ ' : ''}${(time / 1000).toFixed(2)} s`
  }

  new Listener('Game Starting', ({ players }) => {
    ignoredPlayerIds.splice(0)

    const player = players.find((p) => p.name === unsafeWindow.selfName)
    if (player === undefined) {
      return
    }

    // チーム戦ではなければプレイヤーを除外しない
    const { teamNumber } = player
    if (teamNumber === null) {
      return
    }

    const teamMates = players.filter((p) => p.teamNumber === teamNumber)
    if (teamMates.length > 1) {
      ignoredPlayerIds.push(...teamMates.map((p) => p.gamePlayerId))
    }
  }).bindListener()

  new Listener('player answered', (event) => {
    for (const playerId of event.filter((id) => !ignoredPlayerIds.includes(id))) {
      const time = formatAnswerTime(playerId)
      if (time !== null) {
        const player = unsafeWindow.quiz.players[playerId]
        if (player !== undefined) {
          player.answer = time
        }
      }
    }
  }).bindListener()

  unsafeWindow.quiz._playerAnswerListner = new Listener('player answers', (event) => {
    for (const answer of event.answers) {
      const time = formatAnswerTime(answer.gamePlayerId)
      const text = time !== null ? `${answer.answer} (${time})` : answer.answer

      const player = unsafeWindow.quiz.players[answer.gamePlayerId]
      if (player !== undefined) {
        player.answer = text
        player.unknownAnswerNumber = answer.answerNumber
        player.toggleTeamAnswerSharing(false)
      }
    }

    if (!unsafeWindow.quiz.isSpectator) {
      unsafeWindow.quiz.answerInput?.showSubmitedAnswer()
      unsafeWindow.quiz.answerInput?.resetAnswerState()
    }

    unsafeWindow.quiz.videoTimerBar.updateState(event.progressBarState)
  })

  AMQ_addScriptData({
    name: 'Display Answer Time 2',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Display player answer time in seconds.',
  })
})
