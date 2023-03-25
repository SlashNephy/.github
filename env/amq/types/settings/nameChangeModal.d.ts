declare class NameChangeModal {
  $modal: JQuery<HTMLElement>
  $tokenCount: JQuery<HTMLElement>
  $nicknameInput: JQuery<HTMLElement>
  $checkAvailableButton: JQuery<HTMLElement>
  $changeButton: JQuery<HTMLElement>
  nicknameAvailableListener: Listener
  changeNicknameListener: Listener
  setup(tokenCount: any): void
  show(): void
  hide(): void
  updateTokenCount(newCount: any): void
}
declare var nameChangeModal: NameChangeModal
