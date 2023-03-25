declare function ViewChanger(): void
declare class ViewChanger {
  currentView: string
  _$loadingScreen: JQuery<HTMLElement>
  setup(): void
  __controllers: {
    main: {
      openView: (callback: any) => void
      closeView: () => void
    }
    expandLibrary: ExpandLibrary
    roomBrowser: RoomBrowser
    lobby: Lobby
    quiz: Quiz
    battleRoyal: BattleRoyal
    cheatTestGame: CheatTestGame
    nexus: Nexus
  }
  changeView(newView: any, arg: any): void
  getCurrentView(): string
  hideLoadingScreen(): void
}
declare var viewChanger: ViewChanger
