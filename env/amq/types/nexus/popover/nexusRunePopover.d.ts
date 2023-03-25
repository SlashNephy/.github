declare class NexusRunePopover extends NexusBasePopover {
  constructor()
  displayRune(
    {
      name,
      description,
      fileName,
      amount,
      inUseAmount,
      type,
    }: {
      name: any
      description: any
      fileName: any
      amount: any
      inUseAmount: any
      type: any
    },
    $triggerElement: any,
    handlerId: any
  ): void
}
declare var nexusRunePopover: NexusRunePopover
