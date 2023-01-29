// ==UserScript==
// @name            AMQ Dynamic Background
// @namespace       https://github.com/SlashNephy
// @version         0.1.0
// @author          SlashNephy
// @description     Set the currently playing video surface as the background image.
// @description:ja  現在再生中の動画を背景画像に設定します。
// @homepage        https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E8%83%8C%E6%99%AF%E3%81%AB%E5%8B%95%E7%94%BB%E3%82%92%E6%B5%81%E3%81%99_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E8%83%8C%E6%99%AF%E3%81%AB%E5%8B%95%E7%94%BB%E3%82%92%E6%B5%81%E3%81%99_UserScript
// @icon            https://animemusicquiz.com/favicon-32x32.png
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-dynamic-background.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-dynamic-background.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://animemusicquiz.com
// @grant           unsafeWindow
// @license         MIT license
// ==/UserScript==

const isReady = () => unsafeWindow.setupDocumentDone === true

const createInstalledWindow = () => {
  if (!isReady()) return
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
  if (!isReady()) return
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
  if (!isReady()) return
  const head = document.head
  const style = document.createElement('style')
  head.appendChild(style)
  style.appendChild(document.createTextNode(css))
}

const CANVAS_UPDATE_INTERVAL = 1000 / 30,
  CANVAS_WIDTH = 1280,
  CANVAS_HEIGHT = 720,
  CANVAS_FILTER = 'blur(6px)'
if (isReady()) {
  const canvas = document.createElement('canvas')
  canvas.classList.add('background-canvas')
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT
  document.body.insertAdjacentElement('afterbegin', canvas)
  setInterval(() => {
    const player = unsafeWindow.quizVideoController.getCurrentPlayer()
    if (player === undefined) {
      return
    }
    if (player.player.hasClass('vjs-hidden')) {
      return
    }
    const ctx = canvas.getContext('2d')
    if (ctx === null) {
      return
    }
    ctx.filter = CANVAS_FILTER
    const video = player.$player[0]
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  }, CANVAS_UPDATE_INTERVAL)
  addStyle(`
  .background-canvas {
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }
  `)
  addScriptData({
    name: 'Dynamic Background',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Set the currently playing video surface as the background image.',
  })
}
