declare function HostPrioList(hosts: any): void
declare class HostPrioList {
  constructor(hosts: any)
  _$list: JQuery<HTMLElement>
  _ENTRY_TEMPLATE: string
  _hostMap: {}
  ENTRY_COUNT: any
  swapPosition(indexOne: any, indexTwo: any): void
  getOrder(): any[]
}
declare function HostPrioEntry(hostName: any, index: any): void
declare class HostPrioEntry {
  constructor(hostName: any, index: any)
  $body: JQuery<any>
  name: any
  index: any
  bindUpClick(handler: any): void
  bindDownClick(handler: any): void
  updateButton(entryCount: any): void
}
declare const SETTING_HOST_PRIO_ENTRY_TEMPLATE: string
