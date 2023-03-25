declare class AudioElement {
  constructor(src: any, loop: any, meanVolume: any)
  howl: any
  loaded: boolean
  loadListeners: any[]
  endListener: any[]
  meanVolume: any
  load(callback: any): void
  play(ownInstance: any): void
  activeId: any
  pause(): void
  reset(): void
  stop(): void
  updateVolume(newVolume: any): void
  fade(targetVolume: any, duration: any): void
}
