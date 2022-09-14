export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T> {
    filterNotNull(): T[]
  }
}

Array.prototype.filterNotNull = function <T>(): T[] {
  return this.filter((item) => item !== null && item !== undefined)
}
