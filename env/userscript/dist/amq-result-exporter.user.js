// ==UserScript==
// @name            AMQ Result Exporter
// @namespace       https://github.com/SlashNephy
// @version         0.3.0
// @author          SlashNephy
// @description     Export song results to your Google Spreadsheet!
// @description:ja  Google スプレッドシートに AMQ のリザルト (正誤、タイトル、難易度...) を送信します。
// @homepage        https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E3%83%AA%E3%82%B6%E3%83%AB%E3%83%88%E3%82%92_Google_%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%E3%81%AB%E9%80%81%E4%BF%A1%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E3%83%AA%E3%82%B6%E3%83%AB%E3%83%88%E3%82%92_Google_%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%E3%81%AB%E9%80%81%E4%BF%A1%E3%81%99%E3%82%8B_UserScript
// @icon            https://animemusicquiz.com/favicon-32x32.png
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-result-exporter.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-result-exporter.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://animemusicquiz.com/
// @connect         script.google.com
// @connect         raw.githubusercontent.com
// @grant           GM_xmlhttpRequest
// @grant           GM_getValue
// @grant           GM_setValue
// @license         MIT license
// ==/UserScript==

const executeXhr = async (request) => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      ...request,
      onload: (response) => {
        resolve(response)
      },
      onerror: (error) => {
        reject(error)
      },
    })
  })
}

const fetchArmEntries = async () => {
  const response = await executeXhr({
    method: 'GET',
    url: 'https://raw.githubusercontent.com/kawaiioverflow/arm/master/arm.json',
  })
  return JSON.parse(response.responseText)
}

class AmqAnswerTimesUtility {
  songStartTime = 0
  playerTimes = []
  constructor() {
    if (typeof Listener === 'undefined') {
      return
    }
    new Listener('play next song', () => {
      this.songStartTime = Date.now()
      this.playerTimes = []
    }).bindListener()
    new Listener('player answered', (data) => {
      const time = Date.now() - this.songStartTime
      data.forEach((gamePlayerId) => {
        this.playerTimes[gamePlayerId] = time
      })
    }).bindListener()
    new Listener('Join Game', (data) => {
      const quizState = data.quizState
      if (quizState) {
        this.songStartTime = Date.now() - quizState.songTimer * 1000
      }
    }).bindListener()
  }
}
const amqAnswerTimesUtility = new AmqAnswerTimesUtility()

const AMQ_createInstalledWindow = () => {
  if (!window.setupDocumentDone) return
  if ($('#installedModal').length === 0) {
    $('#gameContainer').append(
      $(`
            <div class="modal fade" id="installedModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <h2 class="modal-title">Installed Userscripts</h2>
                        </div>
                        <div class="modal-body" style="overflow-y: auto;max-height: calc(100vh - 150px);">
                            <div id="installedContainer">
                                You have the following scripts installed (click on each of them to learn more)<br>
                                This window can also be opened by going to AMQ settings (the gear icon on bottom right) and clicking "Installed Userscripts"
                                <div id="installedListContainer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    )
    $('#mainMenu')
      .prepend(
        $(`
            <div class="button floatingContainer mainMenuButton" id="mpInstalled" data-toggle="modal" data-target="#installedModal">
                <h1>Installed Userscripts</h1>
            </div>
        `)
      )
      .css('margin-top', '20vh')
    $('#optionsContainer > ul').prepend(
      $(`
            <li class="clickAble" data-toggle="modal" data-target="#installedModal">Installed Userscripts</li>
        `)
    )
    AMQ_addStyle(`
            .descriptionContainer {
                width: 95%;
                margin: auto;
            }
            .descriptionContainer img {
                width: 80%;
                margin: 10px 10%;
            }
        `)
  }
}
const AMQ_addScriptData = (metadata) => {
  AMQ_createInstalledWindow()
  $('#installedListContainer').append(
    $('<div></div>')
      .append(
        $('<h4></h4>')
          .html(
            `<i class="fa fa-caret-right"></i> ${metadata.name !== undefined ? metadata.name : 'Unknown'} by ${
              metadata.author !== undefined ? metadata.author : 'Unknown'
            }`
          )
          .css('font-weight', 'bold')
          .css('cursor', 'pointer')
          .click(function () {
            const selector = $(this).next()
            if (selector.is(':visible')) {
              selector.slideUp()
              $(this).find('.fa-caret-down').addClass('fa-caret-right').removeClass('fa-caret-down')
            } else {
              selector.slideDown()
              $(this).find('.fa-caret-right').addClass('fa-caret-down').removeClass('fa-caret-right')
            }
          })
      )
      .append(
        $('<div></div>')
          .addClass('descriptionContainer')
          .html(metadata.description !== undefined ? metadata.description : 'No description provided')
          .hide()
      )
  )
}
const AMQ_addStyle = (css) => {
  const head = document.head
  const style = document.createElement('style')
  head.appendChild(style)
  style.appendChild(document.createTextNode(css))
}

const loadGasUrl = () => {
  const url = GM_getValue('GAS_URL', '')
  if (url) {
    return url
  }
  GM_setValue('GAS_URL', '')
  throw new Error('Please set GAS_URL from the Storage tab in Tampermonkey dashboard.')
}
loadGasUrl()
const armEntries = []
fetchArmEntries()
  .then((entries) => armEntries.push(...entries))
  .catch(console.error)
const executeGas = async (row) => {
  const url = loadGasUrl()
  await executeXhr({
    url,
    method: 'POST',
    data: JSON.stringify(row),
  })
}
const handle = (payload) => {
  const self = Object.values(quiz.players).find((p) => p.isSelf && p._inGame)
  if (!self) {
    return
  }
  const result = {
    time: Date.now(),
    number: parseInt($('#qpCurrentSongCount').text()),
    game_mode: quiz.gameMode,
    song: {
      name: payload.songInfo.songName,
      anime: {
        answer: {
          english: payload.songInfo.animeNames.english,
          romaji: payload.songInfo.animeNames.romaji,
          alt_answers: [...new Set(payload.songInfo.altAnimeNames.concat(payload.songInfo.altAnimeNamesAnswers))],
        },
        vintage: payload.songInfo.vintage,
        tags: payload.songInfo.animeTags,
        genre: payload.songInfo.animeGenre,
        mal_id: payload.songInfo.siteIds.malId,
        annict_id: armEntries.find((e) => e.mal_id === payload.songInfo.siteIds.malId)?.annict_id,
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
        sample_point: quizVideoController.moePlayers[quizVideoController.currentMoePlayerId].startPoint,
        video_length: parseFloat(
          quizVideoController.moePlayers[quizVideoController.currentMoePlayerId].$player
            .find('video')[0]
            .duration.toFixed(2)
        ),
        video_url: payload.songInfo.urlMap.catbox
          ? payload.songInfo.urlMap.catbox['720'] || payload.songInfo.urlMap.catbox['480']
          : payload.songInfo.urlMap.openingsmoe
          ? payload.songInfo.urlMap.openingsmoe['720'] || payload.songInfo.urlMap.openingsmoe['480']
          : null,
        audio_url: payload.songInfo.urlMap.catbox
          ? payload.songInfo.urlMap.catbox['0']
          : payload.songInfo.urlMap.openingsmoe
          ? payload.songInfo.urlMap.openingsmoe['0']
          : null,
      },
    },
    players: {
      count: Object.values(quiz.players).length,
      active_count: Object.values(quiz.players).filter((player) => !player.avatarSlot._disabled).length,
      correct_count: payload.players.filter((player) => player.correct).length,
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
          guessTime: amqAnswerTimesUtility.playerTimes[p.gamePlayerId],
          active: !quiz.players[p.gamePlayerId].avatarSlot._disabled,
          position: p.position,
          positionSlot: p.positionSlot,
        })),
    },
  }
  const selfResult = result.players.items.find((p) => p.id === self.gamePlayerId)
  const selfAnswer = selfResult?.answer.replace('...', '').replace(/ \(\d+ms\)$/, '') || ''
  const row = [
    result.time,
    result.number,
    result.game_mode,
    selfResult?.correct ?? false,
    selfAnswer,
    selfResult?.guessTime ?? 0,
    result.song.anime.answer.romaji,
    result.song.anime.answer.english,
    result.song.anime.answer.alt_answers.join('\n'),
    result.song.difficulty,
    result.song.type,
    result.song.anime.vintage,
    result.song.anime.type,
    result.song.anime.score,
    result.song.anime.mal_id,
    result.song.anime.annict_id ?? '',
    result.song.name,
    result.song.artist,
    result.song.anime.genre.join('\n'),
    result.song.anime.tags.join('\n'),
    result.song.file.video_url ?? '',
    result.song.file.audio_url ?? '',
    result.song.file.video_length,
    result.song.file.sample_point,
    result.players.correct_count,
    result.players.active_count,
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
  ]
  executeGas(row).catch(console.error)
}
const listener = new Listener('answer results', handle)
listener.bindListener()
AMQ_addScriptData({
  name: 'Result Exporter',
  author: 'SlashNephy &lt;spica@starry.blue&gt;',
  description: 'Export song results to Google Spreadsheet!',
})
