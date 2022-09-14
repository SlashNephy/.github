export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T> {
    toSet(): Set<T>
  }
}

Array.prototype.toSet = function <T>(): Set<T> {
  return new Set(this)
}
