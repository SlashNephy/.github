export {}

declare global {
  interface Array<T> {
    last(): T
  }
}

Array.prototype.last = function () {
  if (this.length === 0) {
    throw new RangeError('Array is empty')
  }

  return this[this.length - 1]
}
