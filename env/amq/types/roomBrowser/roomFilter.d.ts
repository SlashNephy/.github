declare function RoomFilter(): void
declare class RoomFilter {
  $FILTER_SEARCH_INPUT: JQuery<HTMLElement>
  $FILTER_BUTTON: JQuery<HTMLElement>
  $FILTER_CONTAINER: JQuery<HTMLElement>
  $ONLY_PUBLIC_CHECKBOX: JQuery<HTMLElement>
  $ONLY_IN_LOBBY: JQuery<HTMLElement>
  $ONLY_OPEN_SLOT: JQuery<HTMLElement>
  $ONLY_FRIENDS: JQuery<HTMLElement>
  $ROOM_SIZE_SLIDER: JQuery<HTMLElement>
  $SONG_COUNT_SLIDER: JQuery<HTMLElement>
  $GUESS_TIME_SLIDER: JQuery<HTMLElement>
  $DIFFICULTY_SLIDER: JQuery<HTMLElement>
  $SHOW_SELECTION_AUTO: JQuery<HTMLElement>
  $SHOW_SELECTION_LOOTING: JQuery<HTMLElement>
  $SCORING_COUNT: JQuery<HTMLElement>
  $SCORING_SPEED: JQuery<HTMLElement>
  $SCORING_LIVES: JQuery<HTMLElement>
  $OPENINGS_CHECKBOX: JQuery<HTMLElement>
  $ENDINGS_CHECKBOX: JQuery<HTMLElement>
  $INSERTS_CHECKBOX: JQuery<HTMLElement>
  $WATCHED_CHECKBOX: JQuery<HTMLElement>
  $UNWATCHED_CHECKBOX: JQuery<HTMLElement>
  $RANDOM_CHECKBOX: JQuery<HTMLElement>
  $ANSWER_MODE_TYPING: JQuery<HTMLElement>
  $ANSWER_MODE_MULTIPLE_CHOICE: JQuery<HTMLElement>
  $TV_TYPE_CHECKBOX: JQuery<HTMLElement>
  $MOVIE_TYPE_CHECKBOX: JQuery<HTMLElement>
  $OVA_TYPE_CHECKBOX: JQuery<HTMLElement>
  $ONA_TYPE_CHECKBOX: JQuery<HTMLElement>
  $SPECIAL_TYPE_CHECKBOX: JQuery<HTMLElement>
  $SAMPLE_POINT_CHECKBOX: JQuery<HTMLElement>
  $PLAYBACK_SPEED_CHECKBOX: JQuery<HTMLElement>
  $ANIME_SCORE_CHECKBOX: JQuery<HTMLElement>
  $VINTAGE_CHECKBOX: JQuery<HTMLElement>
  $GENRE_CHECKBOX: JQuery<HTMLElement>
  $TAG_CHECKBOX: JQuery<HTMLElement>
  $POPULARITY_CHECKBOX: JQuery<HTMLElement>
  _DEFAULT_VALUES: {
    TRUE_CHECKBOXES: JQuery<HTMLElement>[]
    FALSE_CHECKBOXES: JQuery<HTMLElement>[]
    SLIDERS: {
      SLIDER: JQuery<HTMLElement>
      VALUE: number[]
    }[]
    SEARCH: string
  }
  setup(): void
  setupFilterOptions(): void
  testRoom(room: any): boolean
  compareSettings(settingA: any, settingB: any): boolean
  reset(): void
}
declare var roomFilter: RoomFilter
