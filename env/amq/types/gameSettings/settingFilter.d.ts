declare function SettingFilter($container: any, valueFormater: any, valueEqualFunctoin: any): void
declare class SettingFilter {
  constructor($container: any, valueFormater: any, valueEqualFunctoin: any)
  $container: any
  $contentContainer: any
  $list: any
  $emptyText: any
  valueFormater: any
  valueEqualFunction: any
  values: any[]
  addValue(value: any): void
  clear(): void
  toggleEmptyText(show: any): void
  relayout(): void
  getValues(): any[]
}
declare namespace SETTING_FILTER_ENTRY_TEMPLATES {
  const VINTAGE: string
  const TEXT: string
}
