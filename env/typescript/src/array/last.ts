export {}

declare global {
  interface Array<T> {
    last(): T
    lastOrNull(): T | null
  }
}

Array.prototype.last = function () {
  if (this.length === 0) {
    throw new RangeError('Array is empty')
  }

  return this[this.length - 1]
}

Array.prototype.lastOrNull = function () {
  if (this.length === 0) {
    return null
  }

  return this[this.length - 1]
}
