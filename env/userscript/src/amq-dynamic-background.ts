import { isReady } from '../lib/amq/isReady'
import { addScriptData, addStyle } from '../lib/thirdparty/amqScriptInfo'

/* eslint-disable @typescript-eslint/naming-convention */
const CANVAS_UPDATE_INTERVAL = 1000 / 30,
  CANVAS_WIDTH = 1280,
  CANVAS_HEIGHT = 720,
  CANVAS_FILTER = 'blur(6px)'
/* eslint-enable @typescript-eslint/naming-convention */

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
