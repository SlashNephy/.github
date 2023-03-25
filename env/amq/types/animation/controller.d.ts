declare class AnimationController {
  constructor(staticAnimationCanvas: any, dynamicAnimationCanvas: any)
  staticCanvas: any
  dynamicCanvas: any
  updateCanvasSize(skipRedraw: any): void
  drawFrame(deltaTimeSeconds: any): void
  clearFrame(): void
}
declare class SimpleAnimationController {
  constructor(canvas: any)
  canvas: any
  running: boolean
  tickListeners: any[]
  start(): void
  lastTimeStamp: number | Date
  runAnimation(): void
  stop(): void
  addTickListener(handler: any): void
  removeTickListener(handler: any): void
}
declare class AdvancedAnimationController {
  constructor(staticCanvas: any, dynamicCanvas: any)
  staticCanvas: any
  dynamicCanvas: any
  staticAnimation: SimpleAnimationController
  dynamicAniamtion: SimpleAnimationController
  domElements: {}
  get canvasClass(): typeof SimpleAnimationController
  get staticCtx(): any
  get dynamicCtx(): any
  disableInputEvents(): void
  enableInputEvents(): void
  updateSize(saveTranslateY: any, skipRedraw: any): void
  drawStatic(): void
  drawDynamic(): void
  addStaticElement(element: any): void
  removeStaticElement(element: any): void
  addDynamicElement(element: any): void
  removeDynamicElement(element: any): void
  startStaticAnimation(): void
  stopStaticAnimation(): void
  startDynamicAnimation(): void
  stopDynamicAnimation(): void
  attatchDragEvents(onStart: any, onDrag: any, onEnd: any): void
  attachTranslateChangeListener(handler: any): void
  enableDrag(): void
  disableDrag(): void
  updateTranslate(xChange: any, yChange: any): void
  setTranslateLimits(horiMin: any, horiMax: any, vertMin: any, vertMax: any, grazeSize: any): void
  addDomElement(id: any, element: any): void
  resetCanvasContent(): void
  disableDomElement(id: any): void
  enableDomElement(id: any): void
  addStaticTickListener(handler: any): void
  removeStaticTickListener(handler: any): void
  addDynamicTickListener(handler: any): void
  removeDynamicTickListener(handler: any): void
  displayClickable(on: any): void
  addClickTickListener(handler: any): void
  addWheelListener(handler: any): void
  updateScale(newScale: any): void
  clearFrame(): void
}
declare class AdvancedAnimationControllerTripple extends AdvancedAnimationController {
  constructor(staticCanvas: any, dynamicCanvas: any, extraDynamicCanvases: any)
  extraDynamicCanvases: any
  extraDynamicAniamtion: SimpleAnimationController
  get extraDynamicCtx(): any
  drawExtraDynamic(): void
  addExtraDynamicElement(element: any): void
  removeExtraDynamicElement(element: any): void
  startExtraDynamicAnimation(): void
  stopExtraDynamicAnimation(): void
  clearExtraDynamicFrame(): void
}
