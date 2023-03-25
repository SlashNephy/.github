declare function ParticleAnimation(): void
declare class ParticleAnimation {
  particleTracks: any[]
  animationRunning: boolean
  addTrack(particleTrack: any): void
  clearTrack(): void
  startAnimation(): void
}
declare function ParticleTrack($startElement: any, $endElement: any, startPointStrategy: any): void
declare class ParticleTrack {
  constructor($startElement: any, $endElement: any, startPointStrategy: any)
  $startElement: any
  $endElement: any
  $particleContainer: JQuery<HTMLElement>
  particels: any[]
  activeParticles: any[]
  endEvent: () => void
  endEventFired: boolean
  startPointStrategy: any
  setEndEvent(event: any): void
  buildTrack(): void
  particleCount: number
  spawnTimeout: number
  spawnAnimation(): number
  spawnParticles(): void
  getSpawnTimeout(): number
  spawnNextParticle(): void
  tick(): boolean
}
declare namespace PARTICLE_SPAWN_STRATEGIES {
  function CIRCLE($spawnElement: any): {
    x: any
    y: any
  }
  function RECTANGLE_VERTICAL_EDGES($spawnElement: any): {
    x: any
    y: any
  }
}
