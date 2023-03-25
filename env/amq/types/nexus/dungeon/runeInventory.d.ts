declare class RuneInventory {
  $container: JQuery<HTMLElement>
  $count: JQuery<HTMLElement>
  $combatWarning: JQuery<HTMLElement>
  $standardMsg: JQuery<HTMLElement>
  $noRunesMsg: JQuery<HTMLElement>
  $runeContainer: JQuery<HTMLElement>
  _count: number
  graceHovers: any[]
  set count(arg: number)
  get count(): number
  resetGraceHovers(): void
  reset(): void
  addRune({
    name,
    fileName,
    description,
    type,
    baseName,
    baseFileName,
  }: {
    name: any
    fileName: any
    description: any
    type: any
    baseName: any
    baseFileName: any
  }): void
  combatWon(): void
}
