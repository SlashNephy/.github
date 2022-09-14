export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T> {
    last(): T
    lastOrNull(): T | null
  }
}

Array.prototype.last = function <T>() {
  if (this.length === 0) {
    throw new RangeError('Array is empty')
  }

  return this[this.length - 1] as T
}

Array.prototype.lastOrNull = function <T>() {
  if (this.length === 0) {
    return null
  }

  return this[this.length - 1] as T
}
