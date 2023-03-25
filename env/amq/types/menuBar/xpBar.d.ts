declare function XpBar(): void
declare class XpBar {
  $xpBarOuter: JQuery<HTMLElement>
  $xpBarInner: JQuery<HTMLElement>
  $xpBarAnimationContainer: JQuery<HTMLElement>
  $levelText: JQuery<HTMLElement>
  $creditText: JQuery<HTMLElement>
  $CREDIT_ICON_GLOW: JQuery<HTMLElement>
  $creditSpawner: JQuery<HTMLElement>
  $xpSpawner: JQuery<HTMLElement>
  $ticketText: JQuery<HTMLElement>
  $ticketSpawner: JQuery<HTMLElement>
  _xpPercent: number
  level: number
  currentCreditCount: number
  currentTicketCount: number
  TICK_RATE: number
  _uploadedUrlRemoved: Listener
  _ticketChangeListener: Listener
  _noteUpdateListener: Listener
  setup(xpInfo: any, level: any, credits: any, tickets: any): void
  creditBubbleTextController: BubbleTextController
  xpBubbleTextController: BubbleTextController
  ticketBubbleTextController: BubbleTextController
  setLevel(newLevel: any): void
  setXpPercent(newXpP: any): void
  setXpText(current: any, target: any): void
  handleXpChange(newXpPercent: any, toNextLevel: any, currentXp: any, level: any, lastGain: any): void
  xpGain(newXpP: any, newLevel: any): void
  setCredits(credits: any, noAnimation: any, onlyIfLarger: any): void
  setTickets(tickets: any, noAnimation: any, onlyIfLarger: any): void
  textCountAnimation(currentAmount: any, targetAmount: any, $textContainer: any): void
}
declare var xpBar: XpBar
