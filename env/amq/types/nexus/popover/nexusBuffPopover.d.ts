declare class NexusBuffPopover extends NexusBasePopover {
  constructor()
  displayBuff(
    {
      name,
      description,
      fileName,
      debuff,
    }: {
      name: any
      description: any
      fileName: any
      debuff: any
    },
    $triggerElement: any,
    handlerId: any
  ): void
}
declare var nexusBuffPopover: NexusBuffPopover
