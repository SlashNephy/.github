declare function SettingStorage(savedSettings: any): void
declare class SettingStorage {
  constructor(savedSettings: any)
  _$SAVED_LIST: JQuery<HTMLElement>
  _$LOAD_CONTAINER: JQuery<HTMLElement>
  _$LOAD_FROM_CODE_BUTTON: JQuery<HTMLElement>
  _$LOAD_ENTRY_CONTAINER: JQuery<HTMLElement>
  _$SAVE_BUTTON: JQuery<HTMLElement>
  _$LOAD_TAB_HEADER: JQuery<HTMLElement>
  _HEADER_MESSAGES: {
    ENABLED: string
    DISABLED: string
  }
  _MAX_SETTING_NAME_LENGTH: number
  _MAX_SAVED_COUNT: number
  saveDisabled: boolean
  loadingEnabled: boolean
  _serilizer: SettingSerilizer
  _tabs: any[]
  _settingDeletedListener: Listener
  saveSettings(settings: any): void
  addSetting(id: any, settingString: any, name: any): void
  setLoadContainerHidden(hidden: any): void
  loadContainerShown(): boolean
  updateScrollBar(): void
  updateSaveButtonState(): void
  setLoadingEnabled(enabled: any): void
}
declare function StoredSettingTab(id: any, settingString: any, name: any, serilizer: any, loadingEnabled: any): void
declare class StoredSettingTab {
  constructor(id: any, settingString: any, name: any, serilizer: any, loadingEnabled: any)
  _$body: JQuery<any>
  _$settingName: JQuery<HTMLElement>
  id: any
  _settingString: any
  deleteSetting(): void
  remove(): void
  setLoadingEnabled(enabled: any): void
}
declare const SETTING_LOAD_LIST_ENTRY_TEMPlATE: string
