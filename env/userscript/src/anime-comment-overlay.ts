import NiconiComments from '@xpadev-net/niconicomments'

import { maxPrograms, targetFps } from './anime-comment-overlay/constant'
import { AbemaVideoOverlay } from './anime-comment-overlay/overlay/abema-video'
import { DanimeOverlay } from './anime-comment-overlay/overlay/danime'
import { EpgStationOnAirOverlay, EpgStationRecordedOverlay } from './anime-comment-overlay/overlay/epgstation'
import { NetflixOverlay } from './anime-comment-overlay/overlay/netflix'
import { fetchComments, findPrograms } from './anime-comment-overlay/provider'
import { NiconicoJikkyoKakoLogProvider } from './anime-comment-overlay/provider/niconico'

import type { CommentOverlayModule } from './anime-comment-overlay/overlay'
import type { CommentProviderModule } from './anime-comment-overlay/provider'

const overlays: CommentOverlayModule[] = [
  DanimeOverlay,
  AbemaVideoOverlay,
  NetflixOverlay,
  EpgStationOnAirOverlay,
  EpgStationRecordedOverlay,
]
const providers: CommentProviderModule[] = [NiconicoJikkyoKakoLogProvider]

async function initializeOverlay(overlay: CommentOverlayModule, params: string[]): Promise<void> {
  const media = await overlay.detectMedia(...params)
  console.log('[anime-comment-overlay] media', media)

  const programs = await findPrograms(media)
  console.log('[anime-comment-overlay] programs', programs)

  const { video, canvas } = overlay.initializeContainers()
  const renderer = new NiconiComments(canvas, undefined, {
    format: 'empty',
  })

  let isInitialized = false
  let cachedVideo: HTMLVideoElement | null = null
  const interval = window.setInterval(() => {
    if (!isInitialized) {
      return
    }

    let time: number
    if (typeof video === 'function') {
      if (cachedVideo?.isConnected !== true) {
        cachedVideo = video()
        if (cachedVideo === null) {
          return
        }
      }
      time = cachedVideo.currentTime
    } else {
      time = video.currentTime
    }

    setTimeout(() => {
      const vpos = Math.floor(time * 100)
      renderer.drawCanvas(vpos)
    }, 0)
  }, 1000 / targetFps)

  function onMediaChanged() {
    overlay.removeEventListener('mediaChanged', onMediaChanged)
    clearInterval(interval)
    renderer.clear()
    canvas.remove()
    initializeOverlays().catch(console.error)
    console.info('[anime-comment-overlay] media changed')
  }
  overlay.addEventListener('mediaChanged', onMediaChanged)

  for await (const comments of fetchComments(providers, media, programs.slice(0, maxPrograms))) {
    setTimeout(() => {
      renderer.addComments(...comments)
    }, 0)
  }

  isInitialized = true
}

async function initializeOverlays(): Promise<void> {
  for (const overlay of overlays) {
    const params = overlay.url.exec(window.location.href)?.slice(1)
    if (params === undefined) {
      continue
    }

    console.info(`[anime-comment-overlay] initializing ${overlay.id}`, params)
    // eslint-disable-next-line no-await-in-loop
    await initializeOverlay(overlay, params)
    console.info(`[anime-comment-overlay] initialized ${overlay.id}`, params)

    break
  }
}

initializeOverlays().catch(console.error)
