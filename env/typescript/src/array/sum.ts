export {}

declare global {
  interface Array<T = number> {
    sum(): number
  }

  interface Array<T> {
    sumBy(key: (item: T) => number): number
  }
}

Array.prototype.sum = function <T = number>(): number {
  const array = this as T[] as unknown as number[]
  return array.reduce((acc, item) => acc + item, 0)
}

Array.prototype.sumBy = function <T>(key: (item: T) => number): number {
  const array = this.map((item) => key(item))
  return array.sum()
}
