declare function VolumeController(): void
declare class VolumeController {
  $bar: JQuery<HTMLElement>
  $indicator: JQuery<HTMLElement>
  $icon: JQuery<HTMLElement>
  setup(): void
  volume: any
  muted: any
  setMuted(state: any): void
  adjustVolume(): void
}
declare var volumeController: VolumeController
