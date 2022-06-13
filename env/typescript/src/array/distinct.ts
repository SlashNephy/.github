export {}

declare global {
  interface Array<T> {
    distinct(): T[]
  }
}

Array.prototype.distinct = function <T>(): T[] {
  return Array.from(new Set(this))
}
