declare class TileBackdropCanvas extends BaseCanvas {
  constructor($canvas: any, backdropWidth: any)
  backdropWidth: any
  drawBackdrop(newSize: any): void
  redraw(): void
  updateContent(): void
  BACKDROP_COLOR: RGB
  BORDER_COLOR: RGB
  BORDER_GLOW: RGB
  SHADOW_BLUR: number
  BORDER_SIZE: number
}
