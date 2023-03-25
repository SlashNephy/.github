declare class VideoPlayer {
  constructor($player: any)
  $player: any
  player: any
  videoVolume: number
  playOnReady: boolean
  reloadTried: boolean
  forcedMute: boolean
  _TIME_TO_BUFFER_BEFORE_READY: number
  get videoLength(): any
  startBufferMonitor(): void
  readyReported: boolean
  bufferMonitorInterval: NodeJS.Timer
  stopBufferMonitor(): void
  handleCanPlay(): void
  handleLoadMetaData(): void
  handleError(): void
  handleVideoReady(): void
  handleVideoFinishedBuffering(): void
  setVolume(newVolume: any): void
  updateVolume(baseVolume: any): void
  hide(): void
  show(): void
  setVideo(videoUrl: any): void
  currentVideoUrl: any
  getVideoVolume(): any
  playVideo(): void
  mute(): void
  unmute(): void
  replayVideo(): void
  pauseVideo(): void
  stopVideo(): void
  getVideoUrl(): any
}
