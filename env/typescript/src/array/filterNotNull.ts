export {}

declare global {
  interface Array<T> {
    filterNotNull(): T[]
  }
}

Array.prototype.filterNotNull = function <T>(): T[] {
  return this.filter((item) => item !== null && item !== undefined)
}
