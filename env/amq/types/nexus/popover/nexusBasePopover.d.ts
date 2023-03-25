declare class NexusBasePopover {
  constructor(extraClasses?: any[])
  $body: JQuery<HTMLElement>
  $headerText: JQuery<HTMLElement>
  $cooldownContainer: JQuery<HTMLElement>
  $cooldown: JQuery<HTMLElement>
  $cooldownDisplay: JQuery<HTMLElement>
  $imageContainer: JQuery<HTMLElement>
  $image: JQuery<HTMLElement>
  $name: JQuery<HTMLElement>
  $description: JQuery<HTMLElement>
  $statInfo: JQuery<HTMLElement>
  $extenionContainer: JQuery<HTMLElement>
  $runeTotalContainer: JQuery<HTMLElement>
  $runeTotal: JQuery<HTMLElement>
  $runeInUseContainer: JQuery<HTMLElement>
  $runeInUse: JQuery<HTMLElement>
  $badgeLevelContainer: JQuery<HTMLElement>
  $badgeLevel: JQuery<HTMLElement>
  $badgeStatBoostContainer: JQuery<HTMLElement>
  $badgeStatBoost: JQuery<HTMLElement>
  $badgeGenreBoostContainer: JQuery<HTMLElement>
  $badgeGenreBoost: JQuery<HTMLElement>
  activeExtendedPopovers: any[]
  currentDirection: string
  $currentCustomImage: any
  $container: JQuery<HTMLElement>
  currentImagePreload: PreloadImage
  currentHandlerId: any
  displayDefault(
    typeName: any,
    name: any,
    description: any,
    src: any,
    srcSet: any,
    $triggerElement: any,
    handlerId: any,
    forceDirection: any,
    $image: any
  ): void
  setupContent(
    typeName: any,
    name: any,
    description: any,
    src: any,
    srcSet: any,
    triggerLoad?: boolean,
    $image?: any
  ): void
  hide(handlerId: any): void
  TEMPALTE: string
  MARGIN_SIZE: number
  CONTAINER_WIDTH: number
}
