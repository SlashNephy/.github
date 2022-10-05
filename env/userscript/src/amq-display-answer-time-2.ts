import { isAmqReady } from '../lib/amq'
import { amqAnswerTimes } from '../lib/thirdparty/amqAnswerTimes'
import { addScriptData } from '../lib/thirdparty/amqScriptInfo'

import type { GameStartingEvent, PlayerAnsweredEvent, PlayerAnswersEvent } from '../types/amq'

const ignoredPlayerIds: number[] = []

const handleGameStarting = ({ players }: GameStartingEvent) => {
  ignoredPlayerIds.splice(0)

  const player = players.find((p) => p.name === unsafeWindow.selfName)
  if (player === undefined) {
    return
  }

  // チーム戦ではなければプレイヤーを除外しない
  const teamNumber = player.teamNumber
  if (teamNumber === null) {
    return
  }

  const teamMates = players.filter((p) => p.teamNumber === teamNumber)
  if (teamMates.length > 1) {
    ignoredPlayerIds.push(...teamMates.map((p) => p.gamePlayerId))
  }
}

const formatAnswerTime = (playerId: number): string | null => {
  const time = amqAnswerTimes.query(playerId)
  if (time === null) {
    return null
  }

  const isLightning = amqAnswerTimes.isFirst(playerId)
  return `${isLightning ? '⚡ ' : ''}${(time / 1000).toFixed(2)} s`
}

const handlePlayerAnswered = (event: PlayerAnsweredEvent) => {
  for (const playerId of event.filter((id) => !ignoredPlayerIds.includes(id))) {
    const time = formatAnswerTime(playerId)
    if (time !== null) {
      unsafeWindow.quiz.players[playerId].answer = time
    }
  }
}

const handlePlayerAnswers = (event: PlayerAnswersEvent) => {
  for (const answer of event.answers) {
    const time = formatAnswerTime(answer.gamePlayerId)
    const text = time !== null ? `${answer.answer} (${time})` : answer.answer

    const player = unsafeWindow.quiz.players[answer.gamePlayerId]
    player.answer = text
    player.unknownAnswerNumber = answer.answerNumber
    player.toggleTeamAnswerSharing(false)
  }

  if (!unsafeWindow.quiz.isSpectator) {
    unsafeWindow.quiz.answerInput.showSubmitedAnswer()
    unsafeWindow.quiz.answerInput.resetAnswerState()
  }

  unsafeWindow.quiz.videoTimerBar.updateState(event.progressBarState)
}

if (isAmqReady()) {
  new Listener('Game Starting', handleGameStarting).bindListener()
  new Listener('player answered', handlePlayerAnswered).bindListener()
  unsafeWindow.quiz._playerAnswerListner = new Listener('player answers', handlePlayerAnswers)

  addScriptData({
    name: 'Display Answer Time 2',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Display player answer time in seconds.',
  })
}
