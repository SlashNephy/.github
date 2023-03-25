declare class MoeVideoPlayer extends VideoPlayer {
  firstVideo: boolean
  _SUPPORTED_RESOLUTIONS: number[]
  troubleTriggerActive: boolean
  startPoint: number
  loadVideo(
    id: any,
    playLength: any,
    startPoint: any,
    firstVideo: any,
    videoMap: any,
    playOnReady: any,
    startTime: any,
    playbackRate: any,
    videoVolumeMap: any
  ): void
  videoMap: any
  videoVolumeMap: any
  playbackRate: any
  startPercent: number
  bufferLength: number
  startTime: number
  hostOrder: any[]
  resolutionOrder: any
  songId: any
  loadAndPlayVideo(
    id: any,
    playLength: any,
    startPoint: any,
    firstVideo: any,
    startTime: any,
    videoMap: any,
    playbackRate: any,
    videoVolumeMap: any
  ): void
  isPlaying(): boolean
  getNextVideoId(): undefined
  resolution: any
  host: any
  startLoading(): void
  tryNextVideo(): void
  BUFFER_MONITOR_TICK_RATE: number
}
