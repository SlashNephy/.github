import NiconiComments from '@xpadev-net/niconicomments'

import { maxPrograms, targetFps } from './anime-comment-overlay/constant'
import { AbemaVideoOverlay } from './anime-comment-overlay/overlay/abema-video'
import { DanimeOverlay } from './anime-comment-overlay/overlay/danime'
import { fetchComments, findPrograms } from './anime-comment-overlay/provider'
import { NiconicoJikkyoKakoLogProvider } from './anime-comment-overlay/provider/niconico'

import type { CommentOverlayModule } from './anime-comment-overlay/overlay'
import type { CommentProviderModule } from './anime-comment-overlay/provider'

const overlays: CommentOverlayModule[] = [DanimeOverlay, AbemaVideoOverlay]
const providers: CommentProviderModule[] = [NiconicoJikkyoKakoLogProvider]

async function initializeOverlay(overlay: CommentOverlayModule, params: string[]): Promise<void> {
  const media = await overlay.detectMedia(...params)
  console.log('[anime-comment-overlay] media', media)

  const programs = await findPrograms(media)
  console.log('[anime-comment-overlay] programs', programs)

  const { video, canvas, toggleButton } = overlay.initializeContainers()
  const renderer = new NiconiComments(canvas, undefined, {
    format: 'empty',
  })

  let isInitialized = false
  let isHide = false
  let cachedVideo: HTMLVideoElement | null = null
  const interval = setInterval(() => {
    if (!isInitialized || isHide) {
      return
    }

    let v: HTMLVideoElement
    if (typeof video === 'function') {
      if (cachedVideo?.isConnected !== true) {
        cachedVideo = video()
        if (cachedVideo === null) {
          return
        }
      }
      v = cachedVideo
    } else {
      v = video
    }
    renderer.drawCanvas(Math.floor(v.currentTime * 100))
  }, 1000 / targetFps)

  toggleButton?.addEventListener('click', () => {
    isHide = !isHide
    if (isHide) {
      renderer.clear()
    }
  })

  function onMediaChanged() {
    overlay.removeEventListener('mediaChanged', onMediaChanged)
    clearInterval(interval)
    renderer.clear()
    initializeOverlay(overlay, params).catch(console.error)
    console.info('[anime-comment-overlay] media changed')
  }
  overlay.addEventListener('mediaChanged', onMediaChanged)

  for await (const comments of fetchComments(providers, media, programs.slice(0, maxPrograms))) {
    renderer.addComments(...comments)
  }

  isInitialized = true
}

for (const overlay of overlays) {
  const params = overlay.url.exec(window.location.href)?.slice(1)
  if (params === undefined) {
    continue
  }

  console.info(`[anime-comment-overlay] initializing ${overlay.name}`)
  initializeOverlay(overlay, params)
    .then(() => {
      console.info(`[anime-comment-overlay] initialized ${overlay.name}`)
    })
    .catch(console.error)
  break
}
