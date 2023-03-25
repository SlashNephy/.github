declare class TroubleShooterDropDown {
  $container: JQuery<HTMLElement>
  $close: JQuery<HTMLElement>
  currentLives: number
  currentMax: number
  inCooldown: boolean
  videoFullyBuffered(): void
  videoIssueBuffering(): void
}
declare var troubleShooterDropDown: TroubleShooterDropDown
