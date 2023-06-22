import NiconiComments from '@xpadev-net/niconicomments'

import { maxPrograms } from './anime-comment-overlay/constant'
import { AbemaVideoOverlay } from './anime-comment-overlay/overlay/abema-video'
import { DanimeOverlay } from './anime-comment-overlay/overlay/danime'
import { fetchComments, findPrograms } from './anime-comment-overlay/provider'
import { NiconicoJikkyoKakoLogProvider } from './anime-comment-overlay/provider/niconico'

import type { CommentOverlayModule } from './anime-comment-overlay/overlay'
import type { CommentProviderModule } from './anime-comment-overlay/provider'

const overlays: CommentOverlayModule[] = [DanimeOverlay, AbemaVideoOverlay]
const providers: CommentProviderModule[] = [NiconicoJikkyoKakoLogProvider]

async function initializeOverlay(overlay: CommentOverlayModule, params: string[]): Promise<void> {
  const { video, canvas, toggleButton } = await overlay.initializeContainers()

  const media = await overlay.detectMedia(...params)
  console.log('[anime-comment-overlay] media', media)

  const programs = await findPrograms(media)
  console.log('[anime-comment-overlay] programs', programs)

  const renderer = new NiconiComments(canvas, undefined, {
    format: 'empty',
  })
  fetchComments(providers, media, programs.slice(0, maxPrograms))
    .then((comments) => {
      renderer.addComments(...comments)
    })
    .catch(console.error)

  let isHide = false
  let cachedVideo: HTMLVideoElement | null = null
  const interval = setInterval(() => {
    if (isHide) {
      return
    }

    let v: HTMLVideoElement
    if (typeof video === 'function') {
      if (cachedVideo?.isConnected !== true) {
        cachedVideo = video()
      }
      v = cachedVideo
    } else {
      v = video
    }
    renderer.drawCanvas(Math.floor(v.currentTime * 100))
  }, 10)

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
}

for (const overlay of overlays) {
  const params = overlay.url.exec(window.location.href)?.slice(1)
  if (params === undefined) {
    continue
  }

  console.info(`[anime-comment-overlay] initializing ${overlay.name}`)
  initializeOverlay(overlay, params).catch(console.error)
  break
}
