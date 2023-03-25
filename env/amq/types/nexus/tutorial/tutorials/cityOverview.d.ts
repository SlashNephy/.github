declare class NexusTutorialCityOverview extends BaseNexusTutorial {
  constructor(tutorialId: any, $container: any, elementMap: any, cityController: any)
  $container: any
}
declare class NexusCityTutorialCityPositionElement extends NexusTutorialBasePositionElement {
  constructor(
    staticElement: any,
    vertPosition: any,
    horPosition: any,
    noOffsetbackdrop: any,
    backdropOffsetX: any,
    backdropOffsetY: any
  )
  get elementCords(): {
    xCord: any
    yCord: any
  }
  get elementHeight(): any
  get elementWidth(): any
}
