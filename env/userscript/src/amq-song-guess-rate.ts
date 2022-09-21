import { addScriptData } from '../lib/thirdparty/amqScriptInfo'

import type { AnswerResultsEvent } from '../types/amq'

if (unsafeWindow.detailedSongInfo === undefined) {
  throw new Error('AMQ Detailed Song Info plugin is not installed.')
}

type GuessCount = {
  correct: number
  total: number
}

const increment = (key: string, isCorrect: boolean): GuessCount => {
  const count = GM_getValue<GuessCount>(key, { correct: 0, total: 0 })
  count.total++
  if (isCorrect) {
    count.correct++
  }

  GM_setValue(key, count)
  return count
}

unsafeWindow.detailedSongInfo.register({
  id: 'guess-rate-row',
  title: 'Guess Rate',
  content(event: AnswerResultsEvent): string | null {
    if (unsafeWindow.quiz === undefined) {
      return null
    }

    const self = Object.values(unsafeWindow.quiz.players).find((p) => p.isSelf && p._inGame)
    if (self === undefined) {
      return null
    }

    const isCorrect = event.players.find((p) => p.gamePlayerId === self.gamePlayerId)?.correct === true
    const count = increment(`${event.songInfo.songName}_${event.songInfo.artist}`, isCorrect)
    return `${count.correct} / ${count.total} (${((count.correct / count.total) * 100).toFixed(1)} %)`
  },
})

addScriptData({
  name: 'Song Guess Rate',
  author: 'SlashNephy &lt;spica@starry.blue&gt;',
  description:
    'Display guess rates per song in side panel of the song. (Requires AMQ Detailed Song Info plugin: version 0.3.0 or higher)',
})
