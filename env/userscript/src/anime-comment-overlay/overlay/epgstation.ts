import { awaitElement } from '../../../lib/awaitFor'
import { fetchEpgStationChannels, fetchEpgStationRecordedItem } from '../../../lib/external/epgstation'

import type { CommentOverlayModule, CommentOverlayModuleEventMap, Containers, Media } from '.'

export const EpgStationOnAirOverlay: CommentOverlayModule = {
  id: 'epgstation-onair',
  name: 'EPGStation (ライブ)',
  url: /^https?:\/\/.+\/#\/onair\/watch/,
  initializeContainers(): Containers {
    throw new Error('not implemented')
  },
  async detectMedia(partId: string): Promise<Media> {
    throw new Error('not implemented')
  },
  addEventListener<K extends keyof CommentOverlayModuleEventMap>(event: K): void {
    switch (event) {
      case 'mediaChanged':
        break
    }
  },
  removeEventListener<K extends keyof CommentOverlayModuleEventMap>(event: K): void {
    switch (event) {
      case 'mediaChanged':
        break
    }
  },
}

export const EpgStationRecordedOverlay: CommentOverlayModule = {
  id: 'epgstation-recorded',
  name: 'EPGStation (録画番組)',
  url: /^https?:\/\/.+\/#\/recorded\/streaming\/\d+/,
  initializeContainers(): Containers {
    const canvas = document.createElement('canvas')
    canvas.width = 1920
    canvas.height = 1080
    canvas.style.position = 'absolute'
    canvas.style.objectFit = 'contain'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.zIndex = '10'

    awaitElement<HTMLVideoElement>('.video-wrap video')
      .then((video) => {
        video.insertAdjacentElement('beforebegin', canvas)
      })
      .catch((e) => {
        console.error(`[anime-comment-overlay] failed to find video element: ${e}`)
      })

    const video = () => document.querySelector<HTMLVideoElement>('.video-wrap video')
    return { video, canvas }
  },
  async detectMedia(): Promise<Media> {
    const queries = new URLSearchParams(window.location.hash.split('?')[1])
    const recordedId = queries.get('recordedId')
    if (recordedId === null) {
      throw new Error('recordedId is null')
    }

    const recorded = await fetchEpgStationRecordedItem(recordedId)
    const channels = await fetchEpgStationChannels()
    const channel = channels.find((x) => x.id === recorded.channelId)
    if (channel === undefined) {
      throw new Error('failed to find channel')
    }

    return {
      video: {
        channel: {
          type: channel.channelType,
          serviceId: channel.serviceId,
        },
        startedAt: new Date(recorded.startAt),
        endedAt: new Date(recorded.endAt),
      },
    }
  },
  addEventListener<K extends keyof CommentOverlayModuleEventMap>(event: K): void {
    switch (event) {
      case 'mediaChanged':
        break
    }
  },
  removeEventListener<K extends keyof CommentOverlayModuleEventMap>(event: K): void {
    switch (event) {
      case 'mediaChanged':
        break
    }
  },
}
