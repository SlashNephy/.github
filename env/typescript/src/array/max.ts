export {}

declare global {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface Array<T = number> {
    max(): number
  }

  interface Array<T> {
    maxBy(key: (item: T) => number): number
  }
}

Array.prototype.max = function <T = number>(): number {
  const array = this as T[] as unknown as number[]
  return Math.max(...array)
}

Array.prototype.maxBy = function <T>(key: (item: T) => number): number {
  const array = this.map((item) => key(item))
  return array.max()
}
