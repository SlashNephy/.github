// eslint-disable-next-line @typescript-eslint/naming-convention
export class GM_Value<T> {
  private readonly key: string

  private readonly defaultValue: T | undefined

  public constructor(key: string, defaultValue?: T, initialize = true) {
    this.key = key
    this.defaultValue = defaultValue

    const value = GM_getValue<T | null>(key, null)
    if (initialize && value === null) {
      GM_setValue(key, defaultValue)
    }
  }

  public get(): T {
    return GM_getValue<T>(this.key, this.defaultValue)
  }

  public set(value: T): void {
    GM_setValue(this.key, value)
  }

  public delete(): void {
    GM_deleteValue(this.key)
  }

  public pop(): T {
    const value = this.get()
    this.delete()
    return value
  }
}
