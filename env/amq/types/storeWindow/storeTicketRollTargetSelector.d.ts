declare class StoreTickRollTargetSelector {
  constructor(rollTargets: any)
  $container: JQuery<HTMLElement>
  $mainSelector: JQuery<HTMLElement>
  $closeButton: JQuery<HTMLElement>
  $contentContainer: JQuery<HTMLElement>
  $targetImg: JQuery<HTMLElement>
  $targetName: JQuery<HTMLElement>
  $noTargetDisplay: JQuery<HTMLElement>
  $targetDisplay: JQuery<HTMLElement>
  rollTargets: any
  open(): void
  close(): void
  selectTarget(target: any): void
  currentTarget: any
  clearTarget(): void
}
declare class StoreTickRollTargetSelectorEntry {
  constructor(
    {
      id,
      name,
      fileName,
    }: {
      id: any
      name: any
      fileName: any
    },
    controller: any
  )
  id: any
  name: any
  $html: JQuery<any>
  src: string
  srcSet: string
  imagePreloader: PreloadImage
  triggerLoadImage(): void
  TEMPLATE: string
}
