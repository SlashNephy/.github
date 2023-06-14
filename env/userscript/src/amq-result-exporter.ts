import { onReady } from '../lib/amq/onReady'
import { PlayerAnswerTimeManager } from '../lib/amq/PlayerAnswerTimeManager'
import { fetchArmEntries } from '../lib/external/arm'
import { executeGmXhr } from '../lib/tampermonkey/executeGmXhr'
import { GM_Value } from '../lib/tampermonkey/GM_Value'

import type { ArmEntry } from '../lib/external/arm'

const gasUrl = new GM_Value('GAS_URL', '')
const dryRun = new GM_Value('DRY_RUN', false)

const armEntries: ArmEntry[] = []

const executeGas = async (row: (string | number | boolean)[]) => {
  const url = gasUrl.get()
  if (url === '') {
    throw new Error('Please set GAS_URL from the Storage tab in Tampermonkey dashboard.')
  }

  if (dryRun.get()) {
    return
  }

  // XXX: CORS を回避するため GM_xmlhttpRequest を使う
  // eslint-disable-next-line deprecation/deprecation
  await executeGmXhr({
    url,
    method: 'POST',
    data: JSON.stringify(row),
    headers: {
      'User-Agent':
        'amq-result-exporter (+https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-result-exporter.user.js)',
      'Content-Type': 'application/json',
    },
  })
}

onReady(() => {
  fetchArmEntries()
    .then((entries) => armEntries.push(...entries))
    .catch(console.error)

  const playerAnswerTimes = new PlayerAnswerTimeManager()
  new Listener('answer results', (event) => {
    const { quiz, quizVideoController } = unsafeWindow

    // 自分が参加していないときは無視
    const self = Object.values(quiz.players).find((p) => p.isSelf && p._inGame)
    if (!self) {
      return
    }

    const result = {
      time: Date.now(),
      number: parseInt($('#qpCurrentSongCount').text(), 10),
      gameMode: quiz.gameMode,
      song: {
        name: event.songInfo.songName,
        anime: {
          answer: {
            english: event.songInfo.animeNames.english,
            romaji: event.songInfo.animeNames.romaji,
            altAnswers: [...new Set(event.songInfo.altAnimeNames.concat(event.songInfo.altAnimeNamesAnswers))],
          },
          vintage: event.songInfo.vintage,
          tags: event.songInfo.animeTags,
          genre: event.songInfo.animeGenre,
          malId: event.songInfo.siteIds.malId,
          aniListId: event.songInfo.siteIds.aniListId,
          annictId: armEntries.find((e) => e.mal_id === event.songInfo.siteIds.malId)?.annict_id,
          type: event.songInfo.animeType,
          score: event.songInfo.animeScore,
        },
        artist: event.songInfo.artist,
        difficulty: event.songInfo.animeDifficulty.toFixed(1),
        type:
          event.songInfo.type === 3
            ? 'Insert Song'
            : event.songInfo.type === 2
            ? `Ending ${event.songInfo.typeNumber}`
            : `Opening ${event.songInfo.typeNumber}`,
        file: {
          samplePoint: quizVideoController.moePlayers[quizVideoController.currentMoePlayerId]?.startPoint,
          videoLength: parseFloat(
            quizVideoController.moePlayers[quizVideoController.currentMoePlayerId]?.$player[0]?.duration.toFixed(2) ??
              '0'
          ),
          videoUrl: event.songInfo.urlMap.catbox
            ? event.songInfo.urlMap.catbox['720'] ?? event.songInfo.urlMap.catbox['480']
            : event.songInfo.urlMap.openingsmoe
            ? event.songInfo.urlMap.openingsmoe['720'] ?? event.songInfo.urlMap.openingsmoe['480']
            : null,
          audioUrl: event.songInfo.urlMap.catbox
            ? event.songInfo.urlMap.catbox['0']
            : event.songInfo.urlMap.openingsmoe
            ? event.songInfo.urlMap.openingsmoe['0']
            : null,
        },
      },
      players: {
        count: Object.values(quiz.players).length,
        activeCount: Object.values(quiz.players).filter((player) => !player.avatarSlot._disabled).length,
        correctCount: event.players.filter((player) => player.correct).length,
        items: Object.values(event.players)
          .sort((a, b) => {
            if (a.answerNumber !== undefined && b.answerNumber !== undefined) {
              return a.answerNumber - b.answerNumber
            }

            const p1name = quiz.players[a.gamePlayerId]?._name
            if (p1name === undefined) {
              return 0
            }

            const p2name = quiz.players[b.gamePlayerId]?._name
            if (p2name === undefined) {
              return 0
            }

            return p1name.localeCompare(p2name)
          })
          .map((p) => ({
            status: p.listStatus,
            id: p.gamePlayerId,
            name: quiz.players[p.gamePlayerId]?._name,
            score: p.score,
            correctGuesses: quiz.gameMode !== 'Standard' && quiz.gameMode !== 'Ranked' ? p.correctGuesses : p.score,
            correct: p.correct,
            answer: quiz.players[p.gamePlayerId]?.avatarSlot.$answerContainerText.text(),
            guessTime: playerAnswerTimes.query(p.gamePlayerId),
            active: !quiz.players[p.gamePlayerId]?.avatarSlot._disabled,
            position: p.position,
            positionSlot: p.positionSlot,
          })),
      },
    }

    const selfResult = result.players.items.find((p) => p.id === self.gamePlayerId)
    const selfAnswer = selfResult?.answer?.replace('...', '').replace(/ \(\d+ms\)$/, '') ?? ''

    const row = [
      result.time,
      result.number,
      result.gameMode,
      selfResult?.correct ?? false,
      selfAnswer,
      selfResult?.guessTime ?? 0,
      result.song.anime.answer.romaji,
      result.song.anime.answer.english,
      result.song.anime.answer.altAnswers.join('\n'),
      result.song.difficulty,
      result.song.type,
      result.song.anime.vintage,
      result.song.anime.type,
      result.song.anime.score,
      result.song.anime.malId,
      result.song.anime.annictId ?? '',
      result.song.name,
      result.song.artist,
      result.song.anime.genre.join('\n'),
      result.song.anime.tags.join('\n'),
      result.song.file.videoUrl ?? '',
      result.song.file.audioUrl ?? '',
      result.song.file.videoLength,
      result.song.file.samplePoint ?? '',
      result.players.correctCount,
      result.players.activeCount,
      result.players.items
        .filter((p) => p.correct)
        .map((p) => p.name)
        .join('\n'),
      result.players.items.map((p) => p.name).join('\n'),
      selfResult?.status ?? 0,
      result.players.items
        .filter((p) => p.status)
        .map((p) => p.name)
        .join('\n'),
      result.song.anime.aniListId,
    ]
    executeGas(row).catch(console.error)
  }).bindListener()

  AMQ_addScriptData({
    name: 'Result Exporter',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Export song results to Google Spreadsheet!',
  })
})
