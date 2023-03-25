declare class NexusEventWindow extends NexusDungeonBaseWindow {
  $nameContainer: any
  $text: any
  $optionContainer: any
  $timer: any
  videoController: NexusEventVideoController
  volumeController: NexusEventWindowVolumeController
  loadingDisplay: NexusEventLoadingDisplay
  mapController: any
  activeOptions: {}
  graceCurrentHovers: any[]
  _nexusMapEventListener: Listener
  _nexusMapEventUpdateListener: Listener
  _nexusMapEventStartTimer: Listener
  _nexusMapEventEndListener: Listener
  _nexusMapEventEnableOptionListener: Listener
  displayContent(eventInfo: any): void
  resetGraceHovers(): void
  setupContent(header: any, text: any, options: any, centerText: any, artifactHighlights: any): void
  startTimer(length: any): void
  timerInterval: any
  stopTimer(): void
  displayVolume(): void
  displayVote(optionId: any, playerVote: any): void
}
declare class NexusEventWindowOption {
  constructor({ optionId, text, active }: { optionId: any; text: any; active: any })
  $body: JQuery<any>
  $voteContainer: JQuery<HTMLElement>
  enable(): void
  disable(): void
  displayVote(playerVote: any): void
  TEMPLATE: string
}
declare class NexusEventWindowVolumeController {
  constructor(videoController: any)
  $container: JQuery<HTMLElement>
  $slider: JQuery<HTMLElement>
  videoController: any
  init(): void
  resetVolume(): void
  show(): void
  hide(): void
}
declare class NexusEventVideoPlayer extends VideoPlayer {
  constructor($video: any, readyCallback: any, finishedBufferingCallback: any)
  readyCallback: any
  finishedBufferingCallback: any
  videoLoadStarted: boolean
  bufferFinished: boolean
  setupVideo({
    videoLink,
    startTime,
    meanVolume,
    playLength,
  }: {
    videoLink: any
    startTime: any
    meanVolume: any
    playLength: any
  }): void
  videoMeanVolume: any
  startTime: any
  bufferLength: any
  startPoint: any
  reset(): void
}
declare class NexusEventVideoController {
  $container: JQuery<HTMLElement>
  playerOne: NexusEventVideoPlayer
  playerTwo: NexusEventVideoPlayer
  activePlayer: NexusEventVideoPlayer
  bufferPlayer: NexusEventVideoPlayer
  currentVideoIndex: number
  currentVideos: any[]
  displayTinyVideo(): void
  hideTinyVideo(): void
  reset(): void
  videoReady(player: any): void
  videoFinishedBuffering(player: any): void
  updateVolume(newVolume: any): void
  setupVideos(videoList: any): void
  startBuffering(videoIndex: any, player: any): void
  playVideo(): void
  stopVideo(): void
  nextVideo(): void
}
declare class NexusEventLoadingDisplay {
  $display: JQuery<HTMLElement>
  dotNumber: number
  start(): void
  runInterval: NodeJS.Timer
  stop(): void
  update(): void
  DOT_COUNT: number
  SPEED: number
}
