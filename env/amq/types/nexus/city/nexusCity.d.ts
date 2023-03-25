declare class NexusCity {
  constructor(statBaseMax: any)
  $container: JQuery<HTMLElement>
  $canvasContainer: JQuery<HTMLElement>
  $locationNameContainer: JQuery<HTMLElement>
  skyCanvasController: AdvancedAnimationController
  cityCanvasController: AdvancedAnimationController
  ostAudioGroup: any
  dungeonSelectionWindow: NexusCityDungeonSelectionWindow
  workshopWindow: NexusCityWorkshopWindow
  innWindow: NexusCityInnWindow
  currentTransformX: number
  currentTransformY: number
  baseLoadDone: boolean
  cityStaticElements: any[]
  cityStaticElementMap: {}
  initDone: boolean
  shown: boolean
  _nexusMapRejoin: Listener
  _startNexusGameLoadListener: Listener
  show(): void
  centerHorizontally(): void
  hide(): void
  fadeOutOst(): void
  init(): void
  loadNexusCityContent(callback: any): void
  skyBackdrop: NexusCityStaticElement
  cloudElement: NexusCitySlideElement
  readjustCanvasSizes(): void
  overflowHeight: number
  overflowWidth: number
  handleMouseMove(canvasX: any, canvasY: any, clientX: any, clientY: any): void
  hoveredElement: any
  scrollMapBottom(): void
  handleMouseClick(canvasX: any, canvasY: any): void
  getElementInCords(x: any, y: any): any
  TRIGGER_SCROLL_PERCENT: number
  SCROLL_SPEED: number
  STANDARD_CITY_HEIGHT: number
  STANDARD_CITY_WIDTH: number
  CITY_RATIO: number
  CITY_STATIC_ELEMENT_DESCRIPTNS: (
    | {
        name: string
        x: number
        y: number
        collisionBoxInfo?: undefined
        nameInfo?: undefined
        clickHandler?: undefined
      }
    | {
        name: string
        x: number
        y: number
        collisionBoxInfo: {
          x: number
          y: number
          width: number
          height: number
        }[]
        nameInfo: {
          name: string
          x: number
          y: number
          locked?: undefined
        }
        clickHandler: () => void
      }
    | {
        name: string
        x: number
        y: number
        collisionBoxInfo: {
          x: number
          y: number
          width: number
          height: number
        }[]
        nameInfo: {
          name: string
          x: number
          y: number
          locked: boolean
        }
        clickHandler?: undefined
      }
  )[]
}
declare class NexusCityStaticElement {
  constructor(
    ctx: any,
    image: any,
    baseX: any,
    baseY: any,
    canvasWidth: any,
    collisionBoxInfo: any,
    nameInfo: any,
    clickHandler: any
  )
  currentCanvasWidth: any
  collisionBoxInfo: any
  canvasElement: NexusCityCanvasElement
  collisionBoxes: any[]
  clickHandler: any
  nameInfo: any
  $nameContainer: JQuery<any>
  updateSize(canvasWidth: any): void
  buildCollisionBox(): void
  displayName(): void
  hideName(): void
  checkCollision(x: any, y: any): boolean
  updateNameContainerPosition(): void
  NAME_TEMPALTE: string
}
declare class NexusCitySlideElement {
  constructor(ctx: any, image: any, baseX: any, baseY: any, canvasWidth: any, speed: any)
  currentCanvasWidth: any
  canvasElement: NexusCityCanvasElementInfiniteSlide
  updateSize(canvasWidth: any): void
}
