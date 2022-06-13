export {}

declare global {
  interface Array<T> {
    lastOrNull(): T | null
  }
}

Array.prototype.lastOrNull = function () {
  if (this.length === 0) {
    return null
  }

  return this[this.length - 1]
}
