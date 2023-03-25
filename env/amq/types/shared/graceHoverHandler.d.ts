declare class GraceHoverHandler {
  constructor($element: any, openDelay: any, closeDelay: any, hoverHandler: any, leaveHandler: any)
  openDelay: any
  closeDelay: any
  hoverHandler: any
  leaveHandler: any
  $element: any
  displayed: boolean
  openTimeout: NodeJS.Timeout
  closeTimeout: NodeJS.Timeout
  triggered: boolean
  triggerDisplay(): void
  hide(): void
  destroy(): void
}
