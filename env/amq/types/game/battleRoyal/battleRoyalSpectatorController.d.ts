declare function BattleRoyalSpectatorController(): void
declare class BattleRoyalSpectatorController {
  $container: JQuery<HTMLElement>
  $icon: JQuery<HTMLElement>
  reset(): void
  show(): void
  hide(): void
  updateIcon(spectatorCount: any): void
}
