export type CommentOverlayModule = {
  id: string
  name: string
  url: RegExp
  initializeContainers(): Containers
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
  video: HTMLVideoElement | (() => HTMLVideoElement | null)
  canvas: HTMLCanvasElement
}

export type CommentOverlayModuleEventMap = {
  mediaChanged(): void
}

export type Media = {
  work?: {
    title: string
    annictIds: number[]
    copyright?: string
  }
  episode?: {
    title: string
    number?: string | number
  }
  video?: {
    channel: {
      type: 'GR' | 'BS' | 'CS' | 'SKY'
      serviceId: number
    }
    startedAt: Date
    endedAt: Date
  }
}
