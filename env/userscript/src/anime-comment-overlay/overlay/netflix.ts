import { awaitElement } from '../../../lib/awaitFor'
import { fetchAnnictBroadcastData } from '../../../lib/external/collect-vod-data'
import { fetchNetflixMediaMetadata } from '../../../lib/external/netflix'
import { AnnictSupportedVodChannelIds } from '../constant'

import type { CommentOverlayModule, CommentOverlayModuleEventMap, Containers, Media } from './index'

export const NetflixOverlay: CommentOverlayModule = {
  name: 'Netflix',
  url: /^https:\/\/www\.netflix.com\/watch\/(\d+)/,
  initializeContainers(): Containers {
    const canvas = document.createElement('canvas')
    canvas.width = 1920
    canvas.height = 1080
    canvas.style.position = 'relative'
    canvas.style.objectFit = 'contain'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.zIndex = '10'

    awaitElement<HTMLVideoElement>('video')
      .then((video) => {
        video.insertAdjacentElement('afterend', canvas)
      })
      .catch((e) => {
        console.error(`[anime-comment-overlay] failed to find video element: ${e}`)
      })

    // TODO: toggleButton

    const video = () => document.querySelector<HTMLVideoElement>('video')
    return { video, canvas }
  },
  async detectMedia(episodeId: string): Promise<Media> {
    const reactContextScript = Array.from(document.getElementsByTagName('script')).find(
      (e) => e.textContent?.includes('reactContext') === true
    )
    if (reactContextScript === undefined) {
      throw new Error('failed to find reactContext script')
    }

    const reactContextJson = reactContextScript.textContent
      ?.replace(/^.+reactContext = (.+);$/, '$1')
      .replace(/\\x(.{2})/g, (_, x) => String.fromCharCode(parseInt(x, 16)))
    if (reactContextJson === undefined) {
      throw new Error('failed to extract reactContext json')
    }

    const context: NetflixReactContext = JSON.parse(reactContextJson)
    const metadata = await fetchNetflixMediaMetadata(
      `${context.models.services.data.memberapi.protocol}://${context.models.services.data.memberapi.hostname}${context.models.services.data.memberapi.path[0]}`,
      episodeId
    )

    const episode = metadata.video.seasons
      .flatMap((s) => s.episodes)
      .find((e) => e.episodeId === metadata.video.currentEpisode)
    if (episode === undefined) {
      throw new Error('failed to find episode')
    }

    const broadcasts = await fetchAnnictBroadcastData()

    return {
      platform: 'netflix',
      work: {
        title: metadata.video.title,
        annictIds: broadcasts
          .filter(
            (x) => x.channel_id === AnnictSupportedVodChannelIds.netflix && x.vod_code === metadata.video.id.toString()
          )
          .map((x) => x.work_id),
      },
      episode: {
        title: episode.title,
        number: episode.seq,
      },
    }
  },
  addEventListener<K extends keyof CommentOverlayModuleEventMap>(
    event: K,
    callback: CommentOverlayModuleEventMap[K]
  ): void {
    switch (event) {
      case 'mediaChanged':
        document.addEventListener('popstate', callback)
    }
  },
  removeEventListener<K extends keyof CommentOverlayModuleEventMap>(
    event: K,
    callback: CommentOverlayModuleEventMap[K]
  ): void {
    switch (event) {
      case 'mediaChanged': {
        document.removeEventListener('popstate', callback)
      }
    }
  },
}

type NetflixReactContext = {
  models: {
    services: {
      data: {
        memberapi: {
          protocol: string
          hostname: string
          path: string[]
        }
      }
    }
  }
}
