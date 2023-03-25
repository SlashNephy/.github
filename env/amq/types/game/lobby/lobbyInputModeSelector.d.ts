declare class LobbyInputModeSelector {
  $container: JQuery<HTMLElement>
  $typingOption: JQuery<HTMLElement>
  $multipleChoiceOption: JQuery<HTMLElement>
  reset(): void
  show(): void
  hide(): void
  sendSelectionUpdate(): void
  displayOptionMessage(): void
  setTypingSelected(): void
  setMultipleChoiceSelected(): void
}
