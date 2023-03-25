declare function ServerStatusTable(serverStatuses: any): void
declare class ServerStatusTable {
  constructor(serverStatuses: any)
  $TABLE_BODY: JQuery<HTMLElement>
  _rowMap: {}
  _SERVER_STATE_CHANGE_LISTENER: Listener
}
declare function ServerStatusTableRow(name: any, online: any): void
declare class ServerStatusTableRow {
  constructor(name: any, online: any)
  name: any
  online: any
  $body: JQuery<any>
  getStateText(): 'Offline' | 'Online'
  updateStateColor(): void
  updateOnline(online: any): void
}
declare const SERVER_STATUS_TEMPLATE: string
