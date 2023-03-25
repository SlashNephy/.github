declare class ImageBuffer {
  bufferCategoies: {
    nexusTileIcons: ImageBufferCategory
    nexusDungeonBG: ImageBufferCategory
    nexusCityDay: ImageBufferCategory
    nexusDungeonSpriteMaps: ImageBufferCategory
  }
  setupImagesInBuffer(category: any, infoList: any): void
  setupImageInBuffer(category: any, name: any, src: any, triggerLoad: any): void
  loadCategory(category: any): void
  waitMultipleCategoryLoad(categoryList: any, callback: any): void
  waitCategoryLoad(category: any, callback: any): void
  waitBufferSpecficImages(category: any, nameList: any, callback: any): void
  getImage(category: any, name: any): any
  getImageBuffer(category: any, name: any): any
}
declare class ImageBufferCategory {
  imageMap: {}
  loaded: boolean
  loadFinishCallbacks: any[]
  addImg(name: any, src: any, forceLoad: any): void
  getImg(name: any): any
  getBufferedImg(name: any): any
  handelLoadFinished(): void
  startLoad(): void
}
declare class BufferedImage {
  constructor(src: any, onloadCallback: any)
  src: any
  onloadCallback: any
  loadStarted: boolean
  loadDone: boolean
  onLoadListeners: any[]
  load(): void
  img: HTMLImageElement
  addLoadListener(callback: any): void
}
declare var imageBuffer: ImageBuffer
