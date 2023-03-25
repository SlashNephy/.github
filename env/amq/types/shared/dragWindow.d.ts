declare class DragWindow {
  constructor($container: any, $dragTrigger: any)
  $container: any
  $dragTrigger: any
  $closeButton: any
  displayed: boolean
  mouseMoveListeners: any[]
  mouseUpListeners: any[]
  mouseDownListeners: any[]
  lastMouseX: any
  lastMouseY: any
  addMouseMoveListener(listener: any): void
  addMouseUpListener(listener: any): void
  addMouseDownListener(listener: any): void
  updatePositionOnDrag(pageX: any, pageY: any): void
  centerContainer(): void
  show(): void
  hide(): void
}
