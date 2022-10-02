// eslint-disable-next-line @typescript-eslint/naming-convention
export class GM_Value<T> {
  public constructor(
    private readonly _key: string,
    private readonly _default?: T,
    private readonly _initialize: boolean = true
  ) {
    const value = GM_getValue<T | null>(_key, null)
    if (_initialize && value === null) {
      GM_setValue(_key, null)
    }
  }

  public get(): T {
    return GM_getValue<T>(this._key, this._default)
  }

  public set(value: T): void {
    GM_setValue(this._key, value)
  }

  public delete(): void {
    GM_deleteValue(this._key)
  }
}
