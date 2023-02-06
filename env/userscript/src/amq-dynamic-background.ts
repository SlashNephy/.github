import { onReady } from '../lib/amq/onReady'

/* eslint-disable @typescript-eslint/naming-convention */
const CANVAS_UPDATE_INTERVAL = 1000 / 30,
  CANVAS_WIDTH = 1280,
  CANVAS_HEIGHT = 720,
  CANVAS_FILTER = 'blur(2px)'
/* eslint-enable @typescript-eslint/naming-convention */

onReady(() => {
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

  const getCurrentQuizVideo = (): [HTMLVideoElement, boolean] => {
    const quizPlayer = unsafeWindow.quizVideoController.getCurrentPlayer()
    if (quizPlayer === undefined || quizPlayer.player.hasClass('vjs-hidden')) {
      return [video, false]
    }

    return [quizPlayer.$player[0], true]
  }

  setInterval(() => {
    const [quizVideo, isQuizVideoPlayable] = getCurrentQuizVideo()

    if (isQuizVideoPlayable) {
      // パフォーマンスのため参照しないときは止めておく
      video.pause()

      // mp3 の時は video をコピーしない
      if (!quizVideo.src.endsWith('.mp3')) {
        if (video.src !== quizVideo.src) {
          video.src = quizVideo.src
        }

        video.currentTime = quizVideo.currentTime
      }
    } else {
      // video が未設定の場合は draw しない
      if (video.src === '') {
        return
      }

      // video をリジュームする
      if (video.paused) {
        void video.play()
      }
    }

    ctx.filter = CANVAS_FILTER
    ctx.drawImage(quizVideo, 0, 0, canvas.width, canvas.height)
  }, CANVAS_UPDATE_INTERVAL)

  AMQ_addScriptData({
    name: 'Dynamic Background',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Set the currently playing video surface as the background image.',
  })
})
