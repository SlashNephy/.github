declare class AnimationShapeCircle {
  constructor(x: any, y: any, radius: any)
  x: any
  y: any
  radius: any
  getRandomPointWithin(): {
    x: number
    y: number
  }
  generateShortestDirection(
    sourceX: any,
    sourceY: any
  ): {
    normVector: {
      x: number
      y: number
    }
    distance: number
  }
  calculateAngleToPoint(x: any, y: any): number
}
declare class AnimationShapeDonut {
  constructor(x: any, y: any, innerRadius: any, outerRadius: any)
  x: any
  y: any
  innerRadius: any
  outerRadius: any
  getRandomPointWithin(): {
    x: number
    y: number
  }
}
declare class CollisionShapeTriangle {
  constructor(cordOne: any, cordTwo: any, cordThree: any)
  cordOne: any
  cordTwo: any
  cordThree: any
  sign(targetX: any, targetY: any, pointOne: any, pointTwo: any): number
  pointInside(targetX: any, targetY: any): boolean
  pointInTriangle(targetX: any, targetY: any): boolean
}
declare class CollisionShapeSquare {
  constructor(corner: any, width: any, height: any)
  corner: any
  width: any
  height: any
  leftX: any
  rightX: any
  topY: any
  bottomY: any
  pointInside(targetX: any, targetY: any): boolean
}
