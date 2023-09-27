export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T = number> {
    sum(): T
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T> {
    sumBy(key: (item: T) => number): number
  }
}

Array.prototype.sum = function <T = number>(): number {
  const array = this as T[] as unknown as number[]

  return array.reduce((acc, item) => acc + item, 0)
}

Array.prototype.sumBy = function <T>(key: (item: T) => number): number {
  const array = this.map((item) => key(item as T))

  return array.sum()
}
