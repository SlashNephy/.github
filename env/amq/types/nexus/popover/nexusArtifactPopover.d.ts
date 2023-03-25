declare class NexusArtifactPopover extends NexusBasePopover {
  constructor()
  displayArtifact(
    {
      name,
      description,
      fileName,
    }: {
      name: any
      description: any
      fileName: any
    },
    $triggerElement: any,
    handlerId: any
  ): void
}
declare var nexusArtifactPopover: NexusArtifactPopover
