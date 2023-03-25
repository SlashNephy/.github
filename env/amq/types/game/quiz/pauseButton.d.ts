declare class PauseButton {
  $button: JQuery<HTMLElement>
  $icon: JQuery<HTMLElement>
  $pauseTextOverlay: JQuery<HTMLElement>
  $pauseCountdownOverlay: JQuery<HTMLElement>
  $pauseCountdownValue: JQuery<HTMLElement>
  pauseOn: boolean
  show(): void
  hide(): void
  updateState(pauseOn: any): void
  startCountdown(lengthMs: any): void
  reset(): void
  PAUSE_ICON_CLASS: string
  PLAY_ICON_CLASS: string
  PAUSE_POPOVER_MESSAGE: string
  PLAY_POPOVER_MESSAGE: string
}
