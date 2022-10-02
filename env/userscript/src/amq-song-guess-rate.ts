import { GM_Value } from '../lib/GM_Value'
import { addScriptData } from '../lib/thirdparty/amqScriptInfo'

import type { AnswerResultsEvent } from '../types/amq'

if (unsafeWindow.detailedSongInfo === undefined) {
  throw new Error('AMQ Detailed Song Info plugin is not installed.')
}

type GuessCount = {
  correct: number
  total: number
}

const increment = async (key: string, isCorrect: boolean) => {
  const hashKey = await digestMessage(key)
  const value = new GM_Value<GuessCount>(hashKey, { correct: 0, total: 0 })
  const count = value.get()
  count.total++
  if (isCorrect) {
    count.correct++
  }

  value.set(count)
  return count
}

// 互換性のため、ハッシュ化以前のカウンターを移行する
const migrate = async () => {
  const regex = /^[\da-f]{64}$/
  const oldKeys = GM_listValues().filter((k) => regex.exec(k) === null)
  await Promise.all(
    oldKeys.map(async (key) => {
      const hashKey = await digestMessage(key)
      const value = new GM_Value<GuessCount>(hashKey, { correct: 0, total: 0 })
      const count = value.get()

      const oldValue = new GM_Value<GuessCount>(hashKey, { correct: 0, total: 0 }, false)
      const oldCount = oldValue.get()
      count.total += oldCount.total
      count.correct += oldCount.correct

      value.set(count)
      oldValue.delete()
    })
  )
}

const digestMessage = async (message: string) => {
  const data = new TextEncoder().encode(message)
  const buffer = await crypto.subtle.digest('SHA-256', data)
  const arrayBuffer = Array.from(new Uint8Array(buffer))
  return arrayBuffer.map((b) => b.toString(16).padStart(2, '0')).join('')
}

unsafeWindow.detailedSongInfo.register({
  id: 'guess-rate-row',
  title: 'Guess Rate',
  async content(event: AnswerResultsEvent): Promise<string | null> {
    if (unsafeWindow.quiz === undefined) {
      return null
    }

    const self = Object.values(unsafeWindow.quiz.players).find((p) => p.isSelf && p._inGame)
    if (self === undefined) {
      return null
    }

    const isCorrect = event.players.find((p) => p.gamePlayerId === self.gamePlayerId)?.correct === true
    const count = await increment(`${event.songInfo.songName}_${event.songInfo.artist}`, isCorrect)
    return `${count.correct} / ${count.total} (${((count.correct / count.total) * 100).toFixed(1)} %)`
  },
})

migrate().catch(console.error)

addScriptData({
  name: 'Song Guess Rate',
  author: 'SlashNephy &lt;spica@starry.blue&gt;',
  description:
    'Display guess rates per song in side panel of the song. (Requires AMQ Detailed Song Info plugin: version 0.3.0 or higher)',
})
