declare function PopoutMessages(): void
declare class PopoutMessages {
  $restartMessageContainer: JQuery<HTMLElement>
  $popoutMessageContainer: JQuery<HTMLElement>
  DONATION_TEMPALTE: string
  STANDARD_TEMPLATE: string
  RANKRED_REWARD_TEMPLATE: string
  POPOUT_CLOSE_TIMEOUT: number
  POPOUT_CLOSE_TIME: number
  popoutMessageQueue: any[]
  closeRestartMessage(): void
  displayRestartMessage(msg: any, time: any): void
  restartAt: any
  restartCountdownInterval: NodeJS.Timer
  displayDonationMessage(donator: any, amount: any, target: any): void
  displayStandardMessage(header: any, message: any): void
  displayRankedRewardMessage(
    position: any,
    oldScore: any,
    oldRank: any,
    newScore: any,
    newRank: any,
    oldBadge: any,
    newBadge: any
  ): void
  displayPopoutMessage(htmlBody: any, force: any, onDisplay?: () => void): void
  popoutMessageCloseTimeout: NodeJS.Timeout
  closePopoutMessage(): void
}
declare var popoutMessages: PopoutMessages
