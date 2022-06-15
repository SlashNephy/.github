export {}

declare global {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface Array<T = number> {
    min(): number
  }

  interface Array<T> {
    minBy(key: (item: T) => number): number
  }
}

Array.prototype.min = function <T = number>(): number {
  const array = this as T[] as unknown as number[]
  return Math.min(...array)
}

Array.prototype.minBy = function <T>(key: (item: T) => number): number {
  const array = this.map((item) => key(item))
  return array.min()
}
