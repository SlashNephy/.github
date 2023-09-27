export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T> {
    random(): T
    randomOrNull(): T | null
  }
}

Array.prototype.random = function <T>() {
  if (this.length === 0) {
    throw new RangeError('Array is empty')
  }

  const index = Math.floor(Math.random() * this.length)

  return this[index] as T
}

Array.prototype.randomOrNull = function <T>() {
  if (this.length === 0) {
    return null
  }

  const index = Math.floor(Math.random() * this.length)

  return this[index] as T
}
