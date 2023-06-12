import { getDetailedSongInfo } from '../lib/amq/getDetailedSongInfo'
import { onReady } from '../lib/amq/onReady'
import { makeSha256HexDigest } from '../lib/makeSha256HexDigest'
import { GM_Value } from '../lib/tampermonkey/GM_Value'

import type { AnswerResultsEvent } from '../types/amq'

type GuessCount = {
  correct: number
  total: number
}

const increment = async (key: string, isCorrect: boolean) => {
  const hashKey = await makeSha256HexDigest(key)
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
      const hashKey = await makeSha256HexDigest(key)
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

onReady(() => {
  getDetailedSongInfo()
    .then(({ register }) => {
      register({
        id: 'guess-rate-row',
        title: 'Guess Rate',
        async content(event: AnswerResultsEvent): Promise<string | null> {
          const self = Object.values(unsafeWindow.quiz.players).find((p) => p.isSelf && p._inGame)
          if (self === undefined) {
            return null
          }

          const isCorrect = event.players.find((p) => p.gamePlayerId === self.gamePlayerId)?.correct === true
          const count = await increment(`${event.songInfo.songName}_${event.songInfo.artist}`, isCorrect)
          return `${count.correct} / ${count.total} (${((count.correct / count.total) * 100).toFixed(1)} %)`
        },
      })
    })
    .catch(console.error)

  migrate().catch(console.error)

  AMQ_addScriptData({
    name: 'Song Guess Rate',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description:
      'Display guess rates per song in side panel of the song. (Requires AMQ Detailed Song Info plugin: version 0.3.0 or higher)',
  })
})
