declare function getTime(): number
/**
 * Format a string with arguments. Arguments are passed as
 * extra arguements for the function
 * @param  {[string]} str [string to format]
 * @return {[string]}     [formated string]
 */
declare function htmlToElement(html: any): [string]
declare function format(str: any, ...args: any[]): any
declare function formatNoHtml(str: any, ...args: any[]): any
declare function displayMessage(
  title: any,
  msg: any,
  callback?: () => void,
  outsideDismiss?: boolean,
  disableSWAL?: boolean
): any
declare function displayHtmlMessage(title: any, html: any, buttonText: any, callback: any): any
declare function displayOption(
  title: any,
  msg: any,
  acceptMsg: any,
  declineMsg: any,
  callback: any,
  callbackCancel: any,
  outsideDismiss?: boolean
): any
declare function removeFromArray(array: any, element: any): void
declare function ChatValidator(): void
declare class ChatValidator {
  _MAX_CHAR_COUNT: number
  validateMsg(msg: any): boolean
}
declare function escapeHtml(string: any): string
declare function escapeRegExp(str: any): any
declare function capitalizeFirstLetter(string: any): any
declare function capitalizeMajorWords(string: any): string
declare function fitTextToContainer($text: any, $container: any, baseFontSize: any, minimumSize: any): void
declare function extractUrls(message: any): string[]
declare function passChatMessage(message: any, emojis: any, allowHtml: any): any
declare function popoutEmotesInMessage($message: any, containerId: any): void
declare function createEmotePopoverHtml(name: any, useSrcSet: any, originalSrc: any): any
declare function getEmojiPath(emojiName: any): string
declare function getCustomEmojiPath(id: any): string
declare function createHoverablePopoverHandlers(
  $parent: any,
  playerName: any
): {
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}
declare function shuffleArray(array: any): any
declare function getVolumeAtMax(): boolean
declare function setOneCheckBoxAlwaysOn(checkboxList: any, alertMessage: any): void
declare function convertDurationToCountdownString(duration: any): string
declare function formatCountdownNumber(value: any): string
declare function createBadgePopoverHtml(fileName: any, badgeName: any, badgeDescription: any): any
declare function numberWithCommas(x: any): any
declare function equalizeVolume(baseVolume: any, sourceVolume: any): any
declare function clearAllPopovers(): void
declare function generateAnimeSiteUrl(siteIds: any, targetListId: any): string
declare function generateAnnUrl(annId: any): string
declare function generateAniListUrl(aniListId: any): string
declare function generateKitsuUrl(kitsuId: any): string
declare function generateMalUrl(malId: any): string
declare function convertTypeInfoToText(type: any, typeNumber: any): string
declare function convertSecondsToTimeString(totalSeconds: any): string
declare function convertListStatusIdToName(
  statusId: any
): 'Completed' | 'Watching' | 'On Hold' | 'Dropped' | 'Planning' | 'Looted'
declare var TICKET_TIER_RHYTHM_PRICES: {
  1: number
  2: number
  3: number
  4: number
}
declare var PAYPAL_ENV: string
declare let SWAL_ACTIVE: boolean
declare var chatValidator: ChatValidator
declare var selfName: any
declare var isGameAdmin: any
declare var isTopAdmin: any
declare var taxRate: any
declare var entityMap: {
  '&': string
  '<': string
  '>': string
  '"': string
  "'": string
  '/': string
  '`': string
  '=': string
}
declare const SERVICES_WORDS_TO_NOT_CAPITALIZE: RegExp
declare const URL_REGEX: RegExp
declare const EMOJI_TEMPLATE: string
declare const EMOTE_TEMPLATE: string
declare const EMOTE_POPOVER_TEMPLATE: string
declare const ANIMATED_EMOJI_HANDLE_REGEX: RegExp
declare const CUSTOM_EMOJI_BASE_PATH: '/emoji?id='
declare const BADGE_POPOVER_TEMPLATE: string
declare const EQUALIZE_BASE_MAX_VOLUME: -34
declare const EQUALIZE_VOLUME_CHANGE_PER_DB: number
declare namespace LIST_STATUS {
  const WATCHING: number
  const COMPLETED: number
  const ON_HOLD: number
  const DROPPED: number
  const PLANNING: number
  const LOOTED: number
}
