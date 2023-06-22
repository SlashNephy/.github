import { awaitElement } from '../../../lib/awaitFor'
import { fetchAnnictBroadcastData } from '../../../lib/external/collect-vod-data'
import { AnnictSupportedVodChannelIds } from '../constant'

import type { CommentOverlayModule, CommentOverlayModuleEventMap, Containers, Media } from './index'

let observer: MutationObserver | null = null

export const AbemaVideoOverlay: CommentOverlayModule = {
  name: 'ABEMAビデオ',
  url: /^https:\/\/abema\.tv\/video\/episode\/([\w-]+)/,
  async initializeContainers(): Promise<Containers> {
    const video = () => {
      const element = document.querySelector<HTMLVideoElement>('video[preload="metadata"]')
      if (element === null) {
        throw new Error('video container not found')
      }

      return element
    }

    const canvas = document.createElement('canvas')
    canvas.width = 1920
    canvas.height = 1080
    canvas.style.position = 'relative'
    canvas.style.objectFit = 'contain'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.zIndex = '10'
    const cover = await awaitElement('.com-vod-VODScreen-video-cover')
    cover.appendChild(canvas)

    return { video, canvas }
  },
  async detectMedia(id: string): Promise<Media> {
    const [titleId, episodeId] = id.split('_', 2)
    if (!titleId || !episodeId) {
      throw new Error(`unexpected id format: ${id}`)
    }

    const title = document.querySelector('.com-video-EpisodeTitleBlock__series-info')?.textContent
    if (!title) {
      throw new Error('title container not found')
    }

    const episode = document.querySelector('.com-video-EpisodeTitleBlock__title')?.textContent
    if (!episode) {
      throw new Error('episode container not found')
    }

    const [episodeNumber, episodeTitle] = episode.split(' ', 2)
    if (!episodeNumber || !episodeTitle) {
      throw new Error(`unexpected episode format: ${episode}`)
    }

    const broadcasts = await fetchAnnictBroadcastData()

    return {
      platform: 'abema-video',
      work: {
        title,
        annictIds: broadcasts
          .filter((x) => x.channel_id === AnnictSupportedVodChannelIds.abemaVideo && x.vod_code === titleId)
          .map((x) => x.work_id),
      },
      episode: {
        title: episodeTitle,
        number: episodeNumber,
      },
    }
  },
  addEventListener<K extends keyof CommentOverlayModuleEventMap>(
    event: K,
    callback: CommentOverlayModuleEventMap[K]
  ): void {
    switch (event) {
      case 'mediaChanged': {
        if (observer !== null) {
          observer.disconnect()
          observer = null
        }

        const target = document.querySelector('.com-video-EpisodeTitleBlock__title')
        if (target === null) {
          throw new Error('target container not found')
        }

        observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (mutation.type === 'characterData' && mutation.target === target) {
              callback()
            }
          }
        })
        observer.observe(target, { characterData: true, subtree: true })
      }
    }
  },
  removeEventListener<K extends keyof CommentOverlayModuleEventMap>(event: K): void {
    switch (event) {
      case 'mediaChanged': {
        observer?.disconnect()
        observer = null
      }
    }
  },
}
