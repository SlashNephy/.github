declare class CDNFormater {
  CDN_URL: string
  AVATAR_URL: string
  BADGE_URL: string
  EMOTE_URL: string
  STORE_ICON_URL: string
  BACKGROUND_URL: string
  TICKET_URL: string
  ENEMY_URL: string
  BOSS_URL: string
  NEXUS_TILE_ICONS_URL: string
  NEXUS_DUNGEON_BACKGROUND_URL: string
  NEXUS_DUNGEON_OST_URL: string
  NEXUS_CITY_DAY_URL: string
  NEXUS_CITY_OST_URL: string
  NEXUS_ABILITY_ICON_URL: string
  NEXUS_ARTIFACT_ICON_URL: string
  NEXUS_RUNE_MOD_ICON_URL: string
  NEXUS_AVATAR_OVERLAYS: string
  NEXUS_SPRITE_SHEET_URL: string
  NEXUS_GENRE_ICON_URL: string
  NEXUS_SFX_URL: string
  NEXUS_BADGE_URL: string
  AVATAR_SIZES: number[]
  AVATAR_POSE_FILENAMES: {
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
  }
  AVATAR_POSE_IDS: {
    BASE: number
    THINKING: number
    WAITING: number
    WRONG: number
    RIGHT: number
    CONFUSED: number
  }
  AVATAR_HEAD_SIZES: number[]
  AVATAR_HEAD_FILENAME: string
  ENEMY_SIZES: number[]
  ENEMY_POSE_FILENAMES: {
    1: string
    2: string
    3: string
    4: string
    5: string
  }
  ENEMY_POSE_IDS: {
    BASE: number
    CHARGING: number
    READY: number
    ATTACK: number
    DEFEATED: number
  }
  ENEMY_HEAD_SIZES: number[]
  ENEMY_HEAD_FILENAME: string
  BADGE_SIZES: number[]
  PATREON_PREVIEW_BADGE_FILENAME: string
  STORE_ICON_SIZES: number[]
  STORE_ICON_HEIGHT_WIDTH_MAP: {
    130: number
    150: number
    200: number
  }
  BACKGROUND_SIZES: number[]
  BACKGROUND_STORE_TILE_SIZE: number
  BACKGROUND_STORE_PREVIEW_SIZE: number
  BACKGROUND_ROOM_BROWSER_SIZE: number
  BACKGROUND_GAME_SIZE: number
  EMOTE_SIZES: number[]
  TICKET_SIZES: number[]
  TICKET_FILE_NAMES: {
    1: string
    2: string
    3: string
    4: string
  }
  RHYTHM_ICON_PATH: string
  NEXUS_TILE_ICON_SIZES: number[]
  NEXUS_DUNGEON_BACKGROUND_SIZES: number[]
  NEXUS_ABILITY_ICON_SIZES: number[]
  NEXUS_ARTIFACTS_ICON_SIZES: number[]
  NEXUS_RUNE_MOD_ICON_SIZES: number[]
  NEXUS_GENRE_ICON_SIZES: number[]
  NEXUS_BADGE_ICON_SIZES: number[]
  newAvatarSrc(avatar: any, outfit: any, option: any, optionOn: any, color: any, poseId: any): string
  newAvatarSrcSet(avatar: any, outfit: any, option: any, optionOn: any, color: any, poseId: any): string
  newAvatarHeadSrc(avatar: any, outfit: any, option: any, optionOn: any, color: any): string
  newAvatarHeadSrcSet(avatar: any, outfit: any, option: any, optionOn: any, color: any): string
  newEnemySrc(enemyName: any, poseId: any): string
  newEnemySrcSet(enemyName: any, poseId: any): string
  newEnemyHeadSrc(enemyName: any): string
  newEnemyHeadSrcSet(enemyName: any): string
  newBossSrc(bossName: any, attackName: any, form: any, poseId: any): string
  newBossSrcSet(bossName: any, attackName: any, form: any, poseId: any): string
  newBossHeadSrc(bossName: any, form: any): string
  newBossHeadSrcSet(bossName: any, form: any): string
  newAvatarBackgroundSrc(fileName: any, size: any): string
  newBadgeSrc(fileName: any): string
  newBadgeSrcSet(fileName: any): string
  newStoreIconSrc(name: any): string
  newStoreIconSrcSet(name: any): string
  newStoreAvatarIconSrc(avatarName: any, outfitName: any): string
  newStoreAvatarIconSrcSet(avatarName: any, outfitName: any): string
  newEmoteSrc(emoteName: any): string
  newEmoteSmallSrc(emoteName: any): string
  newEmoteSrcSet(emoteName: any): string
  newTicketSrc(ticketTier: any): string
  newTicketSrcSet(ticketTier: any): string
  formatScoreIconOutfitName(name: any): any
  newNexusTileIconSrc(name: any): string
  newNexusDungeonBackgroundSrc(name: any): string
  newNexusDungeonOstSrc(name: any): string
  newNexusCityDaySrc(name: any): string
  newNexusCityOstSrc(name: any): string
  newNexusAbilityIconSrc(name: any): string
  newNexusAbilityIconSrcSet(name: any): string
  newNexusArtifactIconSrc(name: any): string
  newNexusArtifactIconSrcSet(name: any): string
  newNexusRuneIconSrc(name: any): string
  newNexusRuneIconSrcSet(name: any): string
  newNexusGenreIconSrc(name: any): string
  newNexusGenreIconSrcSet(name: any): string
  newNexusAvatarOverlaySrc(name: any): string
  newNexusAvatarOverlaySrcSet(name: any): string
  newNexusBadgeSrc(level: any, size: any): string
  newNexusSpriteSheetSrc(name: any, size: any): string
  newNexusSfxSrc(name: any): string
  newSizePath(size: any): string
  buildUrl(...args: any[]): string
}
declare var cdnFormater: CDNFormater
