declare function SettingMessageFormater(): void
declare class SettingMessageFormater {
  ARROW_HTML: string
  format(newEntry: any, oldEntry: any, settingName: any): string
  translateOnOff(on: any): 'On' | 'Off'
  translateVintageSeason(seasonId: any): 'Winter' | 'Spring' | 'Summer' | 'Fall'
  translateVintageEntry(entry: any): string
  formatGenreTagString(entry: any, name: any): string
  translateSettingNameToText(
    setting: any
  ):
    | 'Vintage'
    | 'Anime Score'
    | 'Player Score'
    | 'Sample Point'
    | 'Guess Time'
    | 'Inventory Size'
    | 'Looting Time'
    | 'Song Selection'
    | 'Show Selection'
    | 'Number of Songs'
    | 'Number of Players'
    | 'Song Popularity'
    | 'Song Difficulty'
    | 'Song Types'
    | 'Opening Categories'
    | 'Ending Categories'
    | 'Insert Categories'
    | 'Room Name'
    | 'Room Private'
    | 'Password'
    | 'Playback Speed'
    | 'Game Mode'
    | 'Modifiers'
    | 'Type'
    | 'Genre'
    | 'Tags'
    | 'Lives'
    | 'Scoring'
    | 'Team Size'
    | 'Watched Distribution'
    | 'Answering'
    | 'Extra Guess Time'
  translateSettingValueToText(setting: any, settingName: any, rangeTranslator: any): string
  translateSubSetting(value: any, settingName: any): any
}
declare var settingMessageFormater: SettingMessageFormater
