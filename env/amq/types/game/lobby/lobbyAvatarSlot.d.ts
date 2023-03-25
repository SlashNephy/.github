declare class LobbyAvatarSlot {
  constructor(
    avatarInfo: any,
    playerName: any,
    playerLevel: any,
    isReady: any,
    isHost: any,
    isSelf: any,
    teamNumber: any,
    numberOfTeams: any,
    teamFullMap: any,
    mixedAnswerMode: any,
    multipleChoice: any
  )
  $LOBBY_SLOT: JQuery<HTMLElement>
  $NAME_OUTER_CONTAINER: JQuery<HTMLElement>
  $NAME_CONTAINER: JQuery<HTMLElement>
  $LEVEL_CONTAINER: JQuery<HTMLElement>
  $IS_HOST_CONTAINER: JQuery<HTMLElement>
  $HOST_OPTIONS: JQuery<HTMLElement>
  $AVATAR_IMAGE: JQuery<HTMLElement>
  $TEAM_DISPLAY: JQuery<HTMLElement>
  $TEAM_DISPLAY_TEXT: JQuery<HTMLHeadingElement>
  $ANSWER_MODE_DISPLAY: JQuery<HTMLElement>
  $ANSWER_MODE_ICON: JQuery<HTMLElement>
  isSelf: any
  set avatar(arg: any)
  set name(arg: any)
  get name(): any
  set level(arg: any)
  set ready(arg: any)
  set isHost(arg: any)
  get isHost(): any
  teamController: LobbyAvatarTeamController
  set numberOfTeams(arg: any)
  set teamNumber(arg: any)
  _name: any
  _isHost: any
  set hostOptionsActive(arg: any)
  setupAvatarOptions(): void
  remove(): void
  updateLayout(): void
  setTeamFull(teamNumber: any, isFull: any): void
  setDisplayAnswerMode(on: any): void
  setAnswerMode(multiChoiceMode: any): void
  SLOT_TEMPLATE: string
}
declare class LobbyAvatarTeamController {
  constructor($lobbySlot: any, numberOfTeams: any, teamFullMap: any, isHost: any)
  $teamDisplay: any
  $teamNumberContainer: any
  $unsetOption: any
  set isHost(arg: any)
  numberMap: {}
  hideTimeout: any
  updateNumberOfTeams(numberOfTeams: any): void
  setTeamFull(teamNumber: any, isFull: any): void
  setActiveNumber(number: any): void
  activeNumber: any
  clearActiveNumber(): void
}
declare class LobbyAvatarTeamNumber {
  constructor(number: any)
  $body: JQuery<any>
  _full: boolean
  set active(arg: any)
  set full(arg: boolean)
  get full(): boolean
  remove(): void
  TEMPLATE: string
}
