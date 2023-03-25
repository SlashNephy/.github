declare class NexusCanvasTile extends AnimationRendorElement {
  constructor(ctx: any, x: any, y: any, sideHeight: any, incomingConDirections: any, genre: any, typeId: any)
  sideHeight: any
  genre: any
  typeId: any
  visisted: boolean
  disabled: boolean
  connectionIncomingDirections: any
  traversIncomingDirections: {}
  disabledIncomingDirection: {}
  leftExtendedDistancePercent: number
  rightExtendedDistancePercent: number
  get glowVersion(): boolean
  get bufferSize(): number
  get sideWidth(): number
  get tileSpacingHeight(): number
  get tileSpacingWidth(): number
  get circleIntersectionDiameter(): number
  get downHeight(): number
  get downWidth(): number
  get circleBufferSize(): number
  get outerHeight(): any
  get outerWidth(): number
  get iconSize(): number
  get lineWidth(): number
  drawShape(ctx: any, onlyLines: any, incomingDirections: any): void
  doStroke(ctx: any): void
  calculateSideConnectionSizes(horiShiftPercent: any): {
    circleVectorX: number
    circleVectorY: number
    firstHoriDistance: number
    firstVertDistance: number
    lastVertDistance: number
    lastHoriDistance: number
    extraHoriTravelDistance: number
  }
  STANDARD_TILE_SIDE_HEIGH: number
  STANDARD_LINE_WIDTH: number
  SMALL_SIDE_WIDTH: number
  SHADOW_BLUR: number
  SIDE_CONNECTION_ANGLE: number
  SIDE_BASE_ANGLE_VECTOR_X: number
  SIDE_BASE_ANGLE_VECTOR_Y: number
  SIDE_CONNECTION_EXTEND_DISTANCE_MIN_PERCENT: number
  SIDE_CONNECTION_EXTEND_DISTANCE_MAX_PERCENT: number
  SIDE_CONNECTION_ENDPOINT_SIDE_DROP: number
  ICON_TRANSPARANCY: number
  DISABLED_ALPHA: number
  VISITED_HIGHLIHT_COLOR: RGB
  VISITED_HIGHLIHT_SHADOW_COLOR: RGB
  VISITED_HIGHLIHT_SHADOW_BLUR: number
  ZONE_COLORS: {
    standard: {
      FILL: RGB
      GLOW: RGB
    }
    comedy: {
      FILL: RGB
      GLOW: RGB
    }
    action: {
      FILL: RGB
      GLOW: RGB
    }
    adventure: {
      FILL: RGB
      GLOW: RGB
    }
    fantasy: {
      FILL: RGB
      GLOW: RGB
    }
    drama: {
      FILL: RGB
      GLOW: RGB
    }
    'sci-fi': {
      FILL: RGB
      GLOW: RGB
    }
    romance: {
      FILL: RGB
      GLOW: RGB
    }
    'slice of life': {
      FILL: RGB
      GLOW: RGB
    }
    supernatural: {
      FILL: RGB
      GLOW: RGB
    }
    mecha: {
      FILL: RGB
      GLOW: RGB
    }
    ecchi: {
      FILL: RGB
      GLOW: RGB
    }
    mystery: {
      FILL: RGB
      GLOW: RGB
    }
    sports: {
      FILL: RGB
      GLOW: RGB
    }
    music: {
      FILL: RGB
      GLOW: RGB
    }
    horror: {
      FILL: RGB
      GLOW: RGB
    }
    psychological: {
      FILL: RGB
      GLOW: RGB
    }
    'mahou shoujo': {
      FILL: RGB
      GLOW: RGB
    }
    thriller: {
      FILL: RGB
      GLOW: RGB
    }
  }
  TYPE_IMAGE_NAMES: {
    1: string
    2: string
    3: string
    4: string
    5: string
  }
}
declare class NexusCanvasGlowTile extends NexusCanvasTile {
  alphaState: number
  direction: number
  active: boolean
  draw(deltaTimeSeconds: any): void
  updateAlpha(deltaTimeSeconds: any): void
  ALPHA_MIN: number
  ALPHA_MAX: number
  CYCLE_SPEED: number
}
declare class NexusCanvasSelectHightlightTile extends NexusCanvasTile {}
declare class NexusCanvasSelectAnimationTile extends NexusCanvasTile {
  highlightTile: NexusCanvasSelectHightlightTile
  active: boolean
  clearPercent: number
  updateExtendDistancePercent(leftExtendedDistancePercent: any, rightExtendedDistancePercent: any): void
  draw(deltaTimeSeconds: any): void
  ANIMATION_TIME: number
  START_CLEAR_PERCENT: number
}
