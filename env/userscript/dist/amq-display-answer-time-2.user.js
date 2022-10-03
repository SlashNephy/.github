// ==UserScript==
// @name            AMQ Display Answer Time 2
// @namespace       https://github.com/SlashNephy
// @version         0.2.0
// @author          SlashNephy
// @description     Display player answer time in seconds.
// @description:ja  プレイヤーの解答時間を秒単位で表示します。
// @homepage        https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E8%A7%A3%E7%AD%94%E6%99%82%E9%96%93%E3%82%92%E7%A7%92%E5%8D%98%E4%BD%8D%E3%81%A7%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E8%A7%A3%E7%AD%94%E6%99%82%E9%96%93%E3%82%92%E7%A7%92%E5%8D%98%E4%BD%8D%E3%81%A7%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @icon            https://animemusicquiz.com/favicon-32x32.png
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-display-answer-time-2.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-display-answer-time-2.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://animemusicquiz.com/*
// @grant           unsafeWindow
// @license         MIT license
// ==/UserScript==

class AmqAnswerTimesUtility {
  songStartTime = 0
  playerTimes = []
  firstPlayers = []
  constructor() {
    if (unsafeWindow.Listener === undefined) {
      return
    }
    new unsafeWindow.Listener('play next song', () => {
      this.songStartTime = Date.now()
      this.playerTimes = []
      this.firstPlayers = []
    }).bindListener()
    new unsafeWindow.Listener('player answered', (playerIds) => {
      const time = Date.now() - this.songStartTime
      if (this.playerTimes.length === 0) {
        this.firstPlayers.push(...playerIds)
      }
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
  query(playerId) {
    return playerId in this.playerTimes ? this.playerTimes[playerId] : null
  }
  isFirst(playerId) {
    return playerId in this.firstPlayers
  }
}
const amqAnswerTimes = new AmqAnswerTimesUtility()

const createInstalledWindow = () => {
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
    addStyle(`
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
const addScriptData = (metadata) => {
  createInstalledWindow()
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
const addStyle = (css) => {
  const head = document.head
  const style = document.createElement('style')
  head.appendChild(style)
  style.appendChild(document.createTextNode(css))
}

const ignoredPlayerIds = []
const handleGameStarting = ({ players }) => {
  ignoredPlayerIds.splice(0)
  const player = players.find((p) => p.name === unsafeWindow.selfName)
  if (player === undefined) {
    return
  }
  const teamNumber = player.teamNumber
  if (teamNumber === null) {
    return
  }
  const teamMates = players.filter((p) => p.teamNumber === teamNumber)
  if (teamMates.length > 1) {
    ignoredPlayerIds.push(...teamMates.map((p) => p.gamePlayerId))
  }
}
const formatAnswerTime = (playerId) => {
  const time = amqAnswerTimes.query(playerId)
  if (time === null) {
    return null
  }
  const isLightning = amqAnswerTimes.isFirst(playerId)
  return `${isLightning ? '⚡ ' : ''}${(time / 1000).toFixed(2)} s`
}
const handlePlayerAnswered = (event) => {
  if (unsafeWindow.quiz === undefined) {
    return
  }
  for (const playerId of event.filter((id) => !ignoredPlayerIds.includes(id))) {
    const time = formatAnswerTime(playerId)
    if (time !== null) {
      unsafeWindow.quiz.players[playerId].answer = time
    }
  }
}
const handlePlayerAnswers = (event) => {
  if (unsafeWindow.quiz === undefined) {
    return
  }
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
if (unsafeWindow.Listener !== undefined && unsafeWindow.quiz !== undefined) {
  new unsafeWindow.Listener('Game Starting', handleGameStarting).bindListener()
  new unsafeWindow.Listener('player answered', handlePlayerAnswered).bindListener()
  unsafeWindow.quiz._playerAnswerListner = new unsafeWindow.Listener('player answers', handlePlayerAnswers)
}
addScriptData({
  name: 'Display Answer Time 2',
  author: 'SlashNephy &lt;spica@starry.blue&gt;',
  description: 'Display player answer time in seconds.',
})
