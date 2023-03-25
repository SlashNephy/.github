declare class NexusWindowItemPreview {
  constructor($window: any)
  $img: any
  $title: any
  $text: any
  displayItem(name: any, description: any, imgSrc: any, imgSrcSet: any): void
  imagePreload: PreloadImage
  reset(): void
}
