import { awaitFor } from '../../../lib/awaitFor'
import { fetchAnnictBroadcastData } from '../../../lib/external/collect-vod-data'
import { fetchDanimePartInfo } from '../../../lib/external/danime'
import { AnnictSupportedVodChannelIds } from '../constant'

import type { CommentOverlayModule, CommentOverlayModuleEventMap, Containers, Media } from './index'

export const DanimeOverlay: CommentOverlayModule = {
  name: 'dアニメストア',
  url: /^https:\/\/animestore\.docomo\.ne\.jp\/animestore\/sc_d_pc\?partId=(\d+)/,
  async initializeContainers(): Promise<Containers> {
    await awaitFor(() => document.querySelector('video#video') !== null)

    const video = document.querySelector<HTMLVideoElement>('video#video')
    if (video === null) {
      throw new Error('video container not found')
    }

    const canvas = document.createElement('canvas')
    canvas.width = 1920
    canvas.height = 1080
    canvas.style.position = 'relative'
    canvas.style.objectFit = 'contain'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.zIndex = '10'
    video.insertAdjacentElement('afterend', canvas)

    const toggleButton = document.createElement('div')
    toggleButton.classList.add('mainButton')
    const innerButton = document.createElement('button')
    innerButton.classList.add('fullscreenButton')
    toggleButton.appendChild(innerButton)
    document.querySelector('.buttonArea .time')?.insertAdjacentElement('afterend', toggleButton)

    return { video, canvas, toggleButton }
  },
  async detectMedia(partId: string): Promise<Media> {
    const [backInfoTxt1, backInfoTxt2, backInfoTxt3] = [$('.backInfoTxt1'), $('.backInfoTxt2'), $('.backInfoTxt3')]
    await awaitFor(() => backInfoTxt1.length > 0 && backInfoTxt2.length > 0 && backInfoTxt3.length > 0)

    const workId = partId.slice(0, 5)
    const broadcasts = await fetchAnnictBroadcastData()
    const info = await fetchDanimePartInfo(partId)

    return {
      platform: 'danime',
      copyright: info.partCopyright,
      work: {
        title: backInfoTxt1.text(),
        annictIds: broadcasts
          .filter((x) => x.channel_id === AnnictSupportedVodChannelIds.dAnime && x.vod_code === workId)
          .map((x) => x.work_id),
      },
      episode: {
        title: backInfoTxt3.text(),
        number: backInfoTxt2.text(),
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
