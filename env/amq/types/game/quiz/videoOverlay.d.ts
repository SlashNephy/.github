declare function VideoOverlay(): void
declare class VideoOverlay {
  $hider: JQuery<HTMLElement>
  $hiderText: JQuery<HTMLElement>
  $extraTimeCounter: JQuery<HTMLElement>
  $bufferingScreen: JQuery<HTMLElement>
  $overlayTextContainers: JQuery<HTMLElement>
  $userVideoHider: JQuery<HTMLElement>
  $textOverlay: JQuery<HTMLElement>
  $returnToLobbyOverlay: JQuery<HTMLElement>
  showLoadingText(): void
  loadingInterval: NodeJS.Timer
  stopLoadingText(): void
  showAnswerText(): void
  showCheatTestText(): void
  showWaitingBuffering(): void
  hideWaitingBuffering(): void
  startTimer(time: any, extraTime: any): void
  extraTime: any
  totaltTime: any
  startTime: number
  timerInterval: NodeJS.Timer
  tickTimer(): void
  stopTimer(): void
  startExtraTimer(): void
  extraStartTime: number
  extraTimerInterval: NodeJS.Timer
  tickExtraTimer(): void
  stopExtraTimer(): void
  setFontSize(): void
  show(): void
  hide(): void
  showTextOverlay(message: any): void
  hideTextOverlay(): void
  toogleUserVideoHidder(autoHidden?: boolean): void
  hideUserVideoHidder(): void
  sendUserHiddenFeedback(hidden: any, autoHidden: any): void
  showReturnToLobbyText(): void
  hideReturnToLobbyText(): void
  reset(): void
}
