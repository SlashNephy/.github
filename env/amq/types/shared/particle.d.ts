declare function Particle($container: any, startPoint: any, endPoint: any, diameter: any, ticks: any): void
declare class Particle {
  constructor($container: any, startPoint: any, endPoint: any, diameter: any, ticks: any)
  $container: any
  diameter: any
  startPoint: any
  path: {
    x: number
    y: number
  }[]
  step: number
  movementCompleted: boolean
  $particle: JQuery<any>
  insert(): void
  update(): void
  delete(): void
  calculateAcceleration(startSpeed: any, distance: any, ticks: any): number
}
declare var particleTemplate: string
