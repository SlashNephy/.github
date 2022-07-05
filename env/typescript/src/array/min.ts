export {}

declare global {
  interface Array<T = number> {
    min(): T
    minOrNull(): T | null
  }

  interface Array<T> {
    minBy<R = number>(key: (item: T) => R): T
    minByOrNull<R = number>(key: (item: T) => R): T | null
  }
}

Array.prototype.min = function <T = number>(): number {
  if (this.length === 0) {
    throw new Error('Array is empty')
  }

  const array = this as T[] as unknown as number[]
  return Math.min(...array)
}

Array.prototype.minOrNull = function <T = number>(): number | null {
  if (this.length === 0) {
    return null
  }

  const array = this as T[] as unknown as number[]
  return Math.min(...array)
}

Array.prototype.minBy = function <T, R = number>(key: (item: T) => R): T {
  if (this.length === 0) {
    throw new Error('Array is empty')
  }

  const array = this.map((item) => key(item))
  const min = array.min()
  return this.find((item) => key(item) === min)
}

Array.prototype.minByOrNull = function <T, R = number>(
  key: (item: T) => R
): T | null {
  if (this.length === 0) {
    return null
  }

  const array = this.map((item) => key(item))
  const min = array.min()
  return this.find((item) => key(item) === min)
}
