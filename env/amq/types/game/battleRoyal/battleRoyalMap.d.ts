declare function BattleRoyalMap(): void
declare class BattleRoyalMap {
  $mapContent: JQuery<HTMLElement>
  $dropText: JQuery<HTMLElement>
  $returnToMapButton: JQuery<HTMLElement>
  mapObjects: {}
  mapGates: {}
  activeObjects: any[]
  playerMap: {}
  tiles: {}
  pointPixelSize: number
  gateSize: any
  tileId: any
  overmapSize: any
  selfPlayer: BattleRoyalPlayer
  activationRadius: any
  tileSize: any
  lastServerUpdate: Date
  lastUpdate: Date
  spectatorCount: number
  collectionFull: boolean
  playerMovementInterval: NodeJS.Timer
  BASE_PLAYER_MOVE_SERVER_TICK_RATE: number
  PLAYER_MOVEMENT_TICK_RATE: number
  playerMovementController: BattleRoyalMovementController
  inventoryFullMessageController: BattleRoyaleInventoryFullMessageController
  drawTileOverview(mapSize: any, isSpectator: any, tilePlayerCounts: any): void
  setupTile(tileState: any, isSpectator: any, inventoryFull: any): void
  spawnObject(object: any, inventoryFull: any): void
  spawnPlayer(playerInfo: any, moveSpeed: any): void
  despawnPlayer(playerId: any): void
  updatePlayerPosition(playerId: any, position: any): void
  spawnGate(position: any, isSpectator: any): void
  objectDespawn(x: any, y: any): void
  containerEntryDespawn(x: any, y: any, annId: any): void
  showContainerContent(x: any, y: any, entries: any): void
  updatePlayerName(gamePlayerId: any, newName: any): void
  relayout(): void
  clear(): void
  extractShowName(nameInfo: any): any
  startPlayerMovement(): void
  executeMove(forceServerUpdate: any): void
  toggleActiveObjects(): void
  stopPlayerMovement(): void
  correctPosition(x: any, y: any): void
  updateTileCount(x: any, y: any, count: any): void
  setCollectionFull(isFull: any): void
}
declare function BattleRoyalTile(x: any, y: any, sizePercent: any, isSpectator: any): void
declare class BattleRoyalTile {
  constructor(x: any, y: any, sizePercent: any, isSpectator: any)
  $html: JQuery<HTMLElement>
  $counter: JQuery<HTMLHeadingElement>
  updateCount(count: any): void
}
declare function BattleRoyalShowEntry(
  annId: any,
  name: any,
  x: any,
  y: any,
  inventoryFull: any,
  inventoryFullMessageController: any,
  updatePosition: any
): void
declare class BattleRoyalShowEntry {
  constructor(
    annId: any,
    name: any,
    x: any,
    y: any,
    inventoryFull: any,
    inventoryFullMessageController: any,
    updatePosition: any
  )
  $html: JQuery<any>
  annId: any
  x: number
  y: number
  inventoryFull: boolean
  active: boolean
  updatePosition(pointPixelSize: any): void
  setActive(active: any): void
  remove(): void
  toggleInventoryFullState(toggleOn: any): void
  template: string
}
declare function BattleRoyalContainerEntry(
  x: any,
  y: any,
  $container: any,
  inventoryFull: any,
  inventoryFullMessageController: any,
  updatePosition: any
): void
declare class BattleRoyalContainerEntry {
  constructor(
    x: any,
    y: any,
    $container: any,
    inventoryFull: any,
    inventoryFullMessageController: any,
    updatePosition: any
  )
  $html: JQuery<any>
  $containerContent: JQuery<HTMLElement>
  x: number
  y: number
  inventoryFull: boolean
  inventoryFullMessageController: any
  active: boolean
  updatePosition(pointPixelSize: any): void
  setActive(active: any): void
  showContent(entries: any): void
  hideContent(): void
  removeContentEntry(id: any): void
  remove(): void
  toggleInventoryFullState(toggleOn: any): void
  template: string
}
declare function BattleRoyalTileGate(
  gateSize: any,
  pointPixelSize: any,
  position: any,
  tileSize: any,
  updatePosition: any,
  isSpectator: any
): void
declare class BattleRoyalTileGate {
  constructor(gateSize: any, pointPixelSize: any, position: any, tileSize: any, updatePosition: any, isSpectator: any)
  $html: JQuery<any>
  gateSize: any
  position: any
  tileSize: any
  active: boolean
  updateSize(pointPixelSize: any): void
  inGate(x: any, y: any): boolean
  setActive(active: any): void
  template: string
}
declare function BattleRoyalPlayer(
  name: any,
  avatar: any,
  x: any,
  y: any,
  pointPixelSize: any,
  self: any,
  tileSize: any
): void
declare class BattleRoyalPlayer {
  constructor(name: any, avatar: any, x: any, y: any, pointPixelSize: any, self: any, tileSize: any)
  $html: JQuery<any>
  x: any
  y: any
  tileSize: any
  move(moveVector: any): void
  updatePosition(pointPixelSize: any): void
  updateName(newName: any): void
  remove(): void
  template: string
}
declare function BattleRoyalMovementController(): void
declare class BattleRoyalMovementController {
  keysDown: {
    up: boolean
    down: boolean
    left: boolean
    right: boolean
  }
  moveSpeedSec: number
  digMoveSpeedSec: number
  UP_KEY_CODES: number[]
  DOWN_KEY_CODES: number[]
  LEFT_KEY_CODES: number[]
  RIGHT_KEY_CODES: number[]
  setSpeed(baseSpeed: any): void
  reset(): void
  moving(): boolean
  getMovementVector(deltaTimeSec: any): {
    x: number
    y: number
  }
}
