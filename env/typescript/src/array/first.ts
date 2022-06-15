export {}

declare global {
  interface Array<T> {
    first(): T
    firstOrNull(): T | null
  }
}

Array.prototype.first = function () {
  if (this.length === 0) {
    throw new RangeError('Array is empty')
  }

  return this[0]
}

Array.prototype.firstOrNull = function () {
  if (this.length === 0) {
    return null
  }

  return this[0]
}
