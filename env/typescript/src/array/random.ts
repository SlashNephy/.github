export {}

declare global {
  interface Array<T> {
    random(): T
    randomOrNull(): T | null
  }
}

Array.prototype.random = function () {
  if (this.length === 0) {
    throw new RangeError('Array is empty')
  }

  const index = Math.floor(Math.random() * this.length)
  return this[index]
}

Array.prototype.randomOrNull = function () {
  if (this.length === 0) {
    return null
  }

  const index = Math.floor(Math.random() * this.length)
  return this[index]
}
