export {}

declare global {
  interface Array<T> {
    firstOrNull(): T | null
  }
}

Array.prototype.firstOrNull = function () {
  if (this.length === 0) {
    return null
  }

  return this[0]
}
