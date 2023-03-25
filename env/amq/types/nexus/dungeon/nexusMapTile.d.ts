declare class NexusMapTile {
  constructor(
    staticCtx: any,
    dynamicCtx: any,
    extraDynamicCtx: any,
    $iconOverlayContainer: any,
    row: any,
    column: any,
    tileInnerWidth: any,
    incomingConDirections: any,
    outgoingConDirections: any,
    genre: any,
    typeId: any
  )
  row: any
  column: any
  tileInnerWidth: any
  outgoingConDirections: any
  genre: any
  typeId: any
  selectable: boolean
  staticTile: NexusCanvasTile
  dynamicTile: NexusCanvasGlowTile
  selectAnimationTile: NexusCanvasSelectAnimationTile
  tileDescription: NexusTileDescirption
  descriptionDisplayed: boolean
  $tileIconRow: JQuery<HTMLElement>
  get tileHeight(): number
  get tileInnerHeight(): number
  get tileOuterHeight(): any
  get tileOuterWidth(): number
  get outgoingConDirectionList(): string[]
  get tileStandardOffsetX(): number
  get tileSquareBoundaryX(): number
  updateCanvasTilePositoin(): void
  canvasX: number
  canvasY: number
  buildCollisionTriangels(): void
  topTriangleCollider: CollisionShapeTriangle
  bottomTriangleCollider: CollisionShapeTriangle
  centerY: any
  setSelectable(on: any, incomingDirection: any): void
  disableGlow(): void
  showGlow(connectionFromDirection: any): void
  setVisited(): void
  cordinateInTile(x: any, y: any): boolean
  disable(): void
  disableFromDirection(direction: any): void
  mouseOnTile($container: any, canvasTranslateX: any, canvasTranslateY: any): void
  descriptionDisplayTimeout: NodeJS.Timeout
  descriptionHideTimeout: NodeJS.Timeout
  runSelectAnimation(): void
  stopSelectAnimation(): void
  mouseLeaveTile(): void
  hideDescription(): void
  displayVote(playerVote: any): void
  updateTileSize(newTileInnerWidth: any): void
  DESCRIPTION_GRACE_PERIOD: number
  DESCRIPTION_DELAY_PERIOD: number
  CENTER_COLUMN_NUMBER: number
  TILE_ICON_ROW_TEMPLATE: string
}
