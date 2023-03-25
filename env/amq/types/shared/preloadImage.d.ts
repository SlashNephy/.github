declare class PreloadImage {
  constructor(
    $img: any,
    src: any,
    srcset: any,
    triggerLoad?: boolean,
    defaultSizes?: any,
    onloadCallback?: any,
    noPreload?: boolean,
    $lasyLoadContainer?: any,
    strictLazy?: boolean,
    $lasyOffsetParent?: any,
    horiLasyLoad?: boolean,
    delayLasyLoad?: boolean,
    lasyLoadOffsetMod?: number
  )
  $img: any
  src: any
  srcset: any
  defaultSizes: any
  onloadCallback: any
  loadStarted: boolean
  $lasyLoadContainer: any
  strictLazy: boolean
  $lasyOffsetParent: any
  horiLasyLoad: boolean
  lasyLoadOffsetMod: number
  lazyLoadCallback: any
  load(): void
  img: HTMLImageElement
  enableLazyLoadCheck(): void
  lazyLoadEvent(): void
  cancel(): void
  SPINNER_IMAGE: HTMLImageElement
}
declare namespace PreloadImage {}
