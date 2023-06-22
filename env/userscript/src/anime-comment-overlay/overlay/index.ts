export type CommentOverlayModule = {
  name: string
  url: RegExp
  initializeContainers(): Promise<Containers>
  detectMedia(...params: string[]): Promise<Media>
  addEventListener<K extends keyof CommentOverlayModuleEventMap>(
    event: K,
    callback: CommentOverlayModuleEventMap[K]
  ): void
  removeEventListener<K extends keyof CommentOverlayModuleEventMap>(
    event: K,
    callback: CommentOverlayModuleEventMap[K]
  ): void
}

export type Containers = {
  video: HTMLVideoElement | (() => HTMLVideoElement)
  canvas: HTMLCanvasElement
  toggleButton?: HTMLElement
}

export type CommentOverlayModuleEventMap = {
  mediaChanged(): void
}

export type Media =
  | {
      platform: 'general'
      work: {
        title: string
        annictIds: number[]
      }
      episode: {
        title?: string
        number?: string
      }
    }
  | {
      platform: 'danime'
      copyright: string
      work: {
        title: string
        annictIds: number[]
      }
      episode: {
        title: string
        number: string
      }
    }
  | {
      platform: 'abema-video'
      work: {
        title: string
        annictIds: number[]
      }
      episode: {
        title: string
        number: string
      }
    }
