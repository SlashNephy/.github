declare class NexusPopoverExtendedDescriptions {
  extendedDescriptionMap: {}
  addBuffDescription({
    name,
    fileName,
    description,
    debuff,
  }: {
    name: any
    fileName: any
    description: any
    debuff: any
  }): void
  getExtendedContentInDescription(description: any): any[]
}
declare var nexusPopoverExtendedDescriptions: NexusPopoverExtendedDescriptions
