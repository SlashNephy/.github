// ==UserScript==
// @name            AMQ Song Guess Rate
// @namespace       https://github.com/SlashNephy
// @version         0.2.1
// @author          SlashNephy
// @description     Display guess rates per song in side panel of the song. (Requires AMQ Detailed Song Info plugin: version 0.3.0 or higher)
// @description:ja  曲のサイドパネルに曲ごとの正答率を表示します。(0.3.0 以降の AMQ Detailed Song Info プラグインが必要です。)
// @homepage        https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E6%9B%B2%E3%81%94%E3%81%A8%E3%81%AE%E6%AD%A3%E7%AD%94%E7%8E%87%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E6%9B%B2%E3%81%94%E3%81%A8%E3%81%AE%E6%AD%A3%E7%AD%94%E7%8E%87%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @icon            https://animemusicquiz.com/favicon-32x32.png
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-song-guess-rate.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-song-guess-rate.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://animemusicquiz.com/*
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           unsafeWindow
// @grant           GM_deleteValue
// @grant           GM_listValues
// @license         MIT license
// ==/UserScript==

class GM_Value {
  _key
  _default
  _initialize
  constructor(_key, _default, _initialize = true) {
    this._key = _key
    this._default = _default
    this._initialize = _initialize
    const value = GM_getValue(_key, null)
    if (_initialize && value === null) {
      GM_setValue(_key, null)
    }
  }
  get() {
    return GM_getValue(this._key, this._default)
  }
  set(value) {
    GM_setValue(this._key, value)
  }
  delete() {
    GM_deleteValue(this._key)
  }
}

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

if (unsafeWindow.detailedSongInfo === undefined) {
  throw new Error('AMQ Detailed Song Info plugin is not installed.')
}
const increment = async (key, isCorrect) => {
  const hashKey = await digestMessage(key)
  const value = new GM_Value(hashKey, { correct: 0, total: 0 })
  const count = value.get()
  count.total++
  if (isCorrect) {
    count.correct++
  }
  value.set(count)
  return count
}
const migrate = async () => {
  const regex = /^[\da-f]{64}$/
  const oldKeys = GM_listValues().filter((k) => regex.exec(k) === null)
  await Promise.all(
    oldKeys.map(async (key) => {
      const hashKey = await digestMessage(key)
      const value = new GM_Value(hashKey, { correct: 0, total: 0 })
      const count = value.get()
      const oldValue = new GM_Value(hashKey, { correct: 0, total: 0 }, false)
      const oldCount = oldValue.get()
      count.total += oldCount.total
      count.correct += oldCount.correct
      value.set(count)
      oldValue.delete()
    })
  )
}
const digestMessage = async (message) => {
  const data = new TextEncoder().encode(message)
  const buffer = await crypto.subtle.digest('SHA-256', data)
  const arrayBuffer = Array.from(new Uint8Array(buffer))
  return arrayBuffer.map((b) => b.toString(16).padStart(2, '0')).join('')
}
unsafeWindow.detailedSongInfo.register({
  id: 'guess-rate-row',
  title: 'Guess Rate',
  async content(event) {
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
