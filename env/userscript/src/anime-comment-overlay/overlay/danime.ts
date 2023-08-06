import { awaitElement } from '../../../lib/awaitFor'
import { fetchAnnictBroadcastData } from '../../../lib/external/collect-vod-data'
import { fetchDanimePartInfo } from '../../../lib/external/danime'
import { AnnictSupportedVodChannelIds } from '../constant'

import type { CommentOverlayModule, CommentOverlayModuleEventMap, Containers, Media } from './index'

export const DanimeOverlay: CommentOverlayModule = {
  name: 'dアニメストア',
  url: /^https:\/\/animestore\.docomo\.ne\.jp\/animestore\/sc_d_pc\?partId=(\d+)/,
  initializeContainers(): Containers {
    const canvas = document.createElement('canvas')
    canvas.width = 1920
    canvas.height = 1080
    canvas.style.position = 'relative'
    canvas.style.objectFit = 'contain'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.zIndex = '10'

    awaitElement<HTMLVideoElement>('video#video')
      .then((video) => {
        video.insertAdjacentElement('afterend', canvas)
      })
      .catch((e) => {
        console.error(`[anime-comment-overlay] failed to find video element: ${e}`)
      })

    const video = () => document.querySelector<HTMLVideoElement>('video#video')
    return { video, canvas }
  },
  async detectMedia(partId: string): Promise<Media> {
    const info = await fetchDanimePartInfo(partId)
    const broadcasts = await fetchAnnictBroadcastData()

    return {
      platform: 'danime',
      copyright: info.partCopyright,
      work: {
        title: info.workTitle,
        annictIds: broadcasts
          .filter((x) => x.channel_id === AnnictSupportedVodChannelIds.dAnime && x.vod_code === info.workId)
          .map((x) => x.work_id),
      },
      episode: {
        title: info.partTitle,
        number: info.partDispNumber,
      },
    }
  },
  addEventListener<K extends keyof CommentOverlayModuleEventMap>(
    event: K,
    callback: CommentOverlayModuleEventMap[K]
  ): void {
    switch (event) {
      case 'mediaChanged':
        $('.backInfoTxt3').on('DOMSubtreeModified propertychange', callback)
    }
  },
  removeEventListener<K extends keyof CommentOverlayModuleEventMap>(
    event: K,
    callback: CommentOverlayModuleEventMap[K]
  ): void {
    switch (event) {
      case 'mediaChanged':
        $('.backInfoTxt3').off('DOMSubtreeModified propertychange', callback)
    }
  },
}
