declare class NexusAbilityPopover extends NexusBasePopover {
  constructor()
  displayAbility(
    {
      name,
      description,
      fileName,
      cooldownLength,
      currentCooldown,
    }: {
      name: any
      description: any
      fileName: any
      cooldownLength: any
      currentCooldown: any
    },
    $triggerElement: any,
    handlerId: any,
    forcedDirection: any
  ): void
}
declare var nexusAbilityPopover: NexusAbilityPopover
