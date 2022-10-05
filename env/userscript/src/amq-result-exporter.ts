import { isAmqReady } from '../lib/amq'
import { executeXhr } from '../lib/api'
import { fetchArmEntries } from '../lib/arm'
import { GM_Value } from '../lib/GM_Value'
import { amqAnswerTimes } from '../lib/thirdparty/amqAnswerTimes'
import { addScriptData } from '../lib/thirdparty/amqScriptInfo'

import type { ArmEntry } from '../lib/arm'
import type { AnswerResultsEvent } from '../types/amq'

const gasUrl = new GM_Value('GAS_URL', '')
const dryRun = new GM_Value('DRY_RUN', false)

const armEntries: ArmEntry[] = []
fetchArmEntries()
  .then((entries) => armEntries.push(...entries))
  .catch(console.error)

const executeGas = async (row: (string | number | boolean)[]) => {
  const url = gasUrl.get()
  if (url === '') {
    throw new Error('Please set GAS_URL from the Storage tab in Tampermonkey dashboard.')
  }

  if (dryRun.get()) {
    return
  }

  await executeXhr({
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

const handle = (payload: AnswerResultsEvent) => {
  const { quiz, quizVideoController } = unsafeWindow

  // 自分が参加していないときは無視
  const self = Object.values(quiz.players).find((p) => p.isSelf && p._inGame)
  if (!self) {
    return
  }

  const result = {
    time: Date.now(),
    number: parseInt($('#qpCurrentSongCount').text()),
    gameMode: quiz.gameMode,
    song: {
      name: payload.songInfo.songName,
      anime: {
        answer: {
          english: payload.songInfo.animeNames.english,
          romaji: payload.songInfo.animeNames.romaji,
          altAnswers: [...new Set(payload.songInfo.altAnimeNames.concat(payload.songInfo.altAnimeNamesAnswers))],
        },
        vintage: payload.songInfo.vintage,
        tags: payload.songInfo.animeTags,
        genre: payload.songInfo.animeGenre,
        malId: payload.songInfo.siteIds.malId,
        aniListId: payload.songInfo.siteIds.aniListId,
        annictId: armEntries.find((e) => e.mal_id === payload.songInfo.siteIds.malId)?.annict_id,
        type: payload.songInfo.animeType,
        score: payload.songInfo.animeScore,
      },
      artist: payload.songInfo.artist,
      difficulty: payload.songInfo.animeDifficulty.toFixed(1),
      type:
        payload.songInfo.type === 3
          ? 'Insert Song'
          : payload.songInfo.type === 2
          ? `Ending ${payload.songInfo.typeNumber}`
          : `Opening ${payload.songInfo.typeNumber}`,
      file: {
        samplePoint: quizVideoController.moePlayers[quizVideoController.currentMoePlayerId].startPoint,
        videoLength: parseFloat(
          quizVideoController.moePlayers[quizVideoController.currentMoePlayerId].$player
            .find('video')[0]
            .duration.toFixed(2)
        ),
        videoUrl: payload.songInfo.urlMap.catbox
          ? payload.songInfo.urlMap.catbox['720'] ?? payload.songInfo.urlMap.catbox['480']
          : payload.songInfo.urlMap.openingsmoe
          ? payload.songInfo.urlMap.openingsmoe['720'] ?? payload.songInfo.urlMap.openingsmoe['480']
          : null,
        audioUrl: payload.songInfo.urlMap.catbox
          ? payload.songInfo.urlMap.catbox['0']
          : payload.songInfo.urlMap.openingsmoe
          ? payload.songInfo.urlMap.openingsmoe['0']
          : null,
      },
    },
    players: {
      count: Object.values(quiz.players).length,
      activeCount: Object.values(quiz.players).filter((player) => !player.avatarSlot._disabled).length,
      correctCount: payload.players.filter((player) => player.correct).length,
      items: Object.values(payload.players)
        .sort((a, b) => {
          if (a.answerNumber !== undefined && b.answerNumber !== undefined) {
            return a.answerNumber - b.answerNumber
          }

          const p1name = quiz.players[a.gamePlayerId]._name
          const p2name = quiz.players[b.gamePlayerId]._name
          return p1name.localeCompare(p2name)
        })
        .map((p) => ({
          status: p.listStatus,
          id: p.gamePlayerId,
          name: quiz.players[p.gamePlayerId]._name,
          score: p.score,
          correctGuesses: quiz.gameMode !== 'Standard' && quiz.gameMode !== 'Ranked' ? p.correctGuesses : p.score,
          correct: p.correct,
          answer: quiz.players[p.gamePlayerId].avatarSlot.$answerContainerText.text(),
          guessTime: amqAnswerTimes.query(p.gamePlayerId),
          active: !quiz.players[p.gamePlayerId].avatarSlot._disabled,
          position: p.position,
          positionSlot: p.positionSlot,
        })),
    },
  }

  const selfResult = result.players.items.find((p) => p.id === self.gamePlayerId)
  const selfAnswer = selfResult?.answer.replace('...', '').replace(/ \(\d+ms\)$/, '') ?? ''

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
    result.song.file.samplePoint,
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
}

if (isAmqReady()) {
  new Listener('answer results', handle).bindListener()

  addScriptData({
    name: 'Result Exporter',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Export song results to Google Spreadsheet!',
  })
}
