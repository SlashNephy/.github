declare class QuizAbilityIcon {
  constructor(
    $iconContainer: any,
    {
      name,
      description,
      fileName,
      enabled,
      cooldownLength,
      currentCooldown,
      targetInfo,
    }: {
      name: any
      description: any
      fileName: any
      enabled: any
      cooldownLength: any
      currentCooldown: any
      targetInfo: any
    },
    slot: any,
    ownAbility: any
  )
  $iconContainer: any
  $icon: any
  $cooldownText: any
  slot: any
  _enabled: any
  cooldownLength: any
  _currentCooldown: any
  abilityHover: GraceHoverHandler
  targetInfo: any
  $iconTarget: JQuery<HTMLElement>
  set enabled(arg: any)
  get enabled(): any
  get onCooldown(): boolean
  get active(): any
  set currentCooldown(arg: any)
  get currentCooldown(): any
  updateState(): void
  validateAbilityTarget(target: any): boolean
  targetSelected(slot: any): void
  ICON_TARGET_TEMPLATE: string
}
