// ==UserScript==
// @name            AMQ Dynamic Background
// @namespace       https://github.com/SlashNephy
// @version         0.2.1
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
  CANVAS_FILTER = 'blur(2px)'
if (isReady()) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (ctx === null) {
    throw new Error('Your browser does not support CanvasRenderingContext2D')
  }
  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  document.body.insertAdjacentElement('afterbegin', canvas)
  const video = document.createElement('video')
  video.style.display = 'none'
  video.muted = true
  video.loop = true
  document.body.insertAdjacentElement('afterbegin', video)
  const getCurrentQuizVideo = () => {
    const quizPlayer = unsafeWindow.quizVideoController.getCurrentPlayer()
    if (quizPlayer === undefined || quizPlayer.player.hasClass('vjs-hidden')) {
      return [video, false]
    }
    return [quizPlayer.$player[0], true]
  }
  setInterval(() => {
    const [quizVideo, isQuizVideoPlayable] = getCurrentQuizVideo()
    if (isQuizVideoPlayable) {
      video.pause()
      if (!quizVideo.src.endsWith('.mp3')) {
        if (video.src !== quizVideo.src) {
          video.src = quizVideo.src
        }
        video.currentTime = quizVideo.currentTime
      }
    } else {
      if (video.src === '') {
        return
      }
      if (video.paused) {
        void video.play()
      }
    }
    ctx.filter = CANVAS_FILTER
    ctx.drawImage(quizVideo, 0, 0, canvas.width, canvas.height)
  }, CANVAS_UPDATE_INTERVAL)
  addScriptData({
    name: 'Dynamic Background',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Set the currently playing video surface as the background image.',
  })
}
