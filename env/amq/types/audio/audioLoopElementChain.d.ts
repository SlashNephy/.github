declare class AudioLoopElementChain {
  constructor(introSource: any, bodySrc: any, meanVolume: any)
  introElement: AudioElement
  bodyElement: AudioElement
  inBody: boolean
  stopped: boolean
  get loaded(): boolean
  get activeElement(): AudioElement
  load(callback: any): void
  play(): void
  pause(): void
  reset(): void
  stop(): void
  updateVolume(newVolume: any): void
  fade(targetVolume: any, duration: any): void
}
