declare class AudioController {
  audioGroups: {
    nexusDungeonOst: AudioGroup
    cityOstGroup: AudioGroup
    nexusSfx: AudioGroup
  }
  nexusMasterVolume: number
  getGroup(name: any): any
  updateNexusMasterVolume(newValue: any): void
  updateNexusOSTVolume(newValue: any): void
  updateCityOSTVolume(newValue: any): void
  updateNexusSfxVolume(newValue: any): void
  updateAllVolumesToNewMean(): void
}
declare class AudioGroup {
  elements: {}
  localeVolume: number
  fadePercent: number
  get volume(): number
  addElement(name: any, element: any): void
  addDynamicBufferElement(name: any, src: any, loop: any, meanVolume: any, bufferCallback?: () => void): void
  waitLoad(callback: any): void
  playTrack(name: any, ownInstance: any): void
  resetAll(): void
  stopTrack(name: any): void
  updateLocaleVolume(newVolume: any): void
  updateVolumes(): void
  fadeTrack(name: any, fadePercent: any, duration: any): void
  pauseTrack(name: any): void
  trackReady(name: any): any
}
declare var audioController: AudioController
