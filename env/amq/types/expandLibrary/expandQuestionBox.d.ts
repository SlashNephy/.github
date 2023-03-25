declare function ExpandQuestionBox(): void
declare class ExpandQuestionBox {
  submitingUrl: boolean
  $STATE_CONTAINER: JQuery<HTMLElement>
  $STATE_WARNING: JQuery<HTMLElement>
  $STATE_SPINNER: JQuery<HTMLElement>
  $SUBMIT_BUTTON: JQuery<HTMLElement>
  $HOST_STATUSES: {
    catbox: {
      720: JQuery<HTMLElement>
      480: JQuery<HTMLElement>
      mp3: JQuery<HTMLElement>
    }
    openingsmoe: JQuery<HTMLElement>
  }
  _VERSION_STATES: {
    APPROVED: number
    PENDING: number
    MISSING: number
    BLOCKED: number
  }
  supportedResolutions: (string | number)[]
  $PREVIEW_SOUND_ONLY_TEXT_CONTAINER: JQuery<HTMLElement>
  $PREVIEW_VIDEO: JQuery<HTMLElement>
  $INPUT_PREVIEW_VIDEO: JQuery<HTMLElement>
  $PREVIEW_CONTAINER: JQuery<HTMLElement>
  $ACTIVE_PREVIEW_TEXT: JQuery<HTMLElement>
  $ALL_PREVIEW_SELECTORS: JQuery<HTMLElement>
  $VIDEO_PREVIEW_SELECTOR: {
    mp3: JQuery<HTMLElement>
    480: JQuery<HTMLElement>
    720: JQuery<HTMLElement>
    preview: JQuery<HTMLElement>
  }
  inputResolution: any
  realResolution: any
  $INPUT: JQuery<HTMLElement>
  currentInput: any
  $ANIME_NAME_CONTAINER: JQuery<HTMLElement>
  $ANIME_NAME_LINK: JQuery<HTMLElement>
  $SONG_NAME: JQuery<HTMLElement>
  $ARTIST_NAME: JQuery<HTMLElement>
  $SONG_TYPENAME: JQuery<HTMLElement>
  $NO_SONG_SELECTED_CONTAINER: JQuery<HTMLElement>
  _ANN_BASE_ENTRY_URL: string
  showSong(
    animeId: any,
    animeName: any,
    songName: any,
    songArtist: any,
    songTypeName: any,
    songUploadStatus: any,
    videoExamples: any
  ): void
  videoExamples: any
  songUploadStatus: any
  currentExampleRes: any
  setHostStatus($statusEntry: any, status: any): void
  setSongUploadStatusPending(host: any, resolution: any): void
  setSongSelected(songSelected: any): void
  showVideoPreview(url: any, previewType: any, noLoad: any): void
  getVideoHost(url: any): 'catbox' | 'openingsmoe'
  isClosedHost(host: any): boolean
  checkVersionStatus(host: any, resolution: any, expectedStatus: any): boolean
  updateSubmitButton(): void
  setSubmitting(newState: any): void
  clearInput(): void
  reset(): void
}
