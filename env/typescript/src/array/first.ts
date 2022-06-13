export {}

declare global {
  interface Array<T> {
    first(): T
  }
}

Array.prototype.first = function () {
  if (this.length === 0) {
    throw new RangeError('Array is empty')
  }

  return this[0]
}
