import { awaitElement } from '../../../lib/awaitFor'
import { CommentOverlayModule, CommentOverlayModuleEventMap, Containers, Media } from '.'
import { fetchEpgStationRecordedItem } from '../../../lib/external/epgstation'

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
  async detectMedia(): Promise<Media> {
    const queries = new URLSearchParams(window.location.search)
    const recordedId = queries.get('recordedId')
    if (recordedId === null) {
      throw new Error('recordedId is null')
    }

    const recorded = await fetchEpgStationRecordedItem(recordedId)
    return {
      work: {
        title: 'TODO',
        annictIds: [],
      },
      episode: {
        title: 'TODO',
        number: recorded.name,
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
