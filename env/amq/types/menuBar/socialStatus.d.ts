declare class SocialStatus {
  constructor($entry: any)
  $entry: any
  currentStatus: number
  changeSocialStatus(socialStatus: any): void
  getSocialStatusInfo(statusCode: any): 'Offline' | 'Online' | 'Do Not Disturb' | 'Away'
  STATUS_IDS: {
    ONLINE: number
    DO_NO_DISTURB: number
    AWAY: number
    INVISIBLE: number
  }
}
