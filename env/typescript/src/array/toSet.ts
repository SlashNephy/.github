export {}

declare global {
  interface Array<T> {
    toSet(): Set<T>
  }
}

Array.prototype.toSet = function <T>(): Set<T> {
  return new Set(this)
}
