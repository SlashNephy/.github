import { onReady } from '../lib/amq/onReady'

onReady(() => {
  const video = document.createElement('video')
  video.id = 'dynamic-background-video'
  video.muted = true
  video.loop = true

  const container = document.getElementById('quizPage') ?? document.body
  container.insertAdjacentElement('afterbegin', video)

  new Listener('answer results', () => {
    const quizPlayer = unsafeWindow.quizVideoController.getCurrentPlayer()
    if (quizPlayer === undefined) {
      return
    }

    // Sound Only の時は video をコピーしない
    if (quizPlayer.player.isAudio()) {
      return
    }

    const quizVideo = quizPlayer.$player[0]
    if (quizVideo !== undefined && video.src !== quizVideo.src) {
      video.src = quizVideo.src
      video.currentTime = quizVideo.currentTime
      video.play().catch(console.error)
    }
  }).bindListener()

  AMQ_addStyle(`
    #dynamic-background-video {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  `)

  AMQ_addScriptData({
    name: 'Dynamic Background',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Set the currently playing video surface as the background image.',
  })
})
