declare function QuizVideoController(): void
declare class QuizVideoController {
  moePlayers: any[]
  nextMoePlayerId: number
  readyToBufferNextVideo: boolean
  _NUMBER_OF_MOE_PLAYERS: number
  setup(): void
  loadNextVideo(): void
  playNextVideo(): void
  replayVideo(): void
  stopVideo(): void
  muteVideo(): void
  unmuteVideo(): void
  setVolume(newVolume: any): void
  calculateNextPlayerId(): void
  getNextPlayer(): any
  getCurrentPlayer(): any
  changeToNextPlayer(): void
  currentMoePlayerId: number
  hideAll(): void
  getCurrentResolution(): any
  getCurrentHost(): any
  getCurrentSongId(): any
  getCurrentVideoStartPoint(): any
  getCurrentVideoLength(): any
  getCurrentVideoUrl(): any
  currentVideoPlaying(): any
  nextVideoInfo(
    songInfo: any,
    playLength: any,
    startPoint: any,
    firstVideo: any,
    startTime: any,
    playbackSpeed: any
  ): void
  _nextVideoInfo: {
    songInfo: any
    playLength: any
    startPoint: any
    playbackSpeed: any
    firstVideo: any
    startTime: any
  }
  popNextVideoInfo(): {
    songInfo: any
    playLength: any
    startPoint: any
    playbackSpeed: any
    firstVideo: any
    startTime: any
  }
  currentVideoDoneBuffering(): void
  reset(): void
}
declare var quizVideoController: QuizVideoController
