declare namespace NEXUS_EVENTS {
  const DAMAGE: string
  const ENEMY_STATE: string
  const ENEMY_TARGET: string
  const SWAP_TARGET: string
  const NEW_TURN_AVATAR: string
  const SWAP_AVATARS: string
  const PLAYER_TARGET: string
  const AVATAR_STATE: string
  const PRE_PLAY: string
  const ABILITY_ENABLED_CHANGE: string
  const ANIME_NAME_HINT: string
  const ABILITY_COOLDOWN_CHANGE: string
  const NEW_BUFF: string
  const BUFF_UPDATE: string
  const BUFF_END: string
  const HP_CHANGE: string
  const DISPLAY_AVATAR_OVERLAY: string
  const REMOVE_AVATAR_OVERLAY: string
  const DISABLED_ACTION: string
  const QUEUE_EVENT: string
  const DELAY_EVENT: string
  const HEAL_EVENT: string
  const FLASH_ICON: string
  const SHIELD_UPDATE: string
  const HIDE_GENRE: string
  const SHOW_GENRE: string
  const SONG_INFO_HINT: string
  const PLAY_SFX: string
  const COMABT_TUTORIAL: string
  const SET_CLONE_EFFECT: string
  const REMOVE_CLONE_EFFECT: string
}
declare namespace NEXUS_RUNE_TYPES {
  const STANDARD: number
  const ADVANCED: number
}
declare namespace NEXUS_RUNE_CATEGORIES {
  const OFFENSIVE: number
  const DEFENSIVE: number
}
declare namespace NEXUS_RUNE_LEVELS {
  const MINOR: number
  const LESSER: number
  const GREATOR: number
  const MAJOR: number
  const SUPERIOR: number
}
declare namespace NEXUS_HIT_EFFECT_IDS {
  const SHAKE: number
  const PUSH: number
  const PUSH_ONE_WAY: number
}
declare class Nexus {
  $view: JQuery<HTMLElement>
  $loadingScreen: JQuery<HTMLElement>
  _nexusMapInitListener: Listener
  get inNexusLobby(): boolean
  get inCoopLobby(): boolean
  get inNexusGame(): boolean
  setup(statBaseMax: any, nexusBuffs: any): void
  mapController: NexusMapController
  cityController: NexusCity
  statBaseMax: any
  changeToDungeon(): void
  changeToNexus(): void
  openView(callback: any, arg: any): void
  closeView(args: any): void
  displayLoading(): void
  hideLoading(): void
}
declare var nexus: Nexus
