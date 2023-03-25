declare class ReturnVoteController extends BaseVoteContainer {
  constructor(videoOverlay: any)
  $VOTE_BUTTON: JQuery<HTMLElement>
  videoOverlay: any
  toggleVoteButton(on: any): void
  vote(votedFor: any): void
  updateState(newState: any, isSpectator: any): void
}
