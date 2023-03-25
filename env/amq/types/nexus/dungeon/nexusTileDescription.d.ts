declare class NexusTileDescirption {
  constructor(typeId: any, genreName: any)
  $body: JQuery<HTMLElement>
  $list: JQuery<HTMLUListElement>
  addRow(text: any): void
  display(x: any, y: any): void
  hide(): void
  detatchTimeout: NodeJS.Timeout
  TEMPLATE: string
  ROW_TEMPLATE: string
  DETATCH_TIMEOUT: number
  TYPE_DESCRIPTION: {
    1: string
    2: string
    3: string
    4: string
    5: string
  }
}
