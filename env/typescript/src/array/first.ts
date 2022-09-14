export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T> {
    first(): T
    firstOrNull(): T | null
  }
}

Array.prototype.first = function <T>() {
  if (this.length === 0) {
    throw new RangeError('Array is empty')
  }

  return this[0] as T
}

Array.prototype.firstOrNull = function <T>() {
  if (this.length === 0) {
    return null
  }

  return this[0] as T
}
