declare class LobbyPlayer extends GamePlayer {
  constructor(
    name: any,
    level: any,
    gamePlayerId: any,
    host: any,
    avatarInfo: any,
    ready: any,
    teamNumber: any,
    numberOfTeams: any,
    teamFullMap: any,
    mixedAnswerMode: any,
    multipleChoice: any
  )
  _ready: any
  lobbySlot: LobbyAvatarSlot
  set ready(arg: any)
  get ready(): any
  set avatar(arg: any)
  set hostOptionsActive(arg: any)
  set teamNumber(arg: any)
  set mixedAnswerActive(arg: any)
  set answerModeMultipleChoice(arg: any)
  remove(): void
  updateAvatarLayout(): void
  updateNumberOfTeams(newNumber: any): void
  setTeamFull(teamNumber: any, isFull: any): void
}
