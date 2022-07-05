export {}

declare global {
  interface Array<T = number> {
    max(): T
    maxOrNull(): T | null
  }

  interface Array<T> {
    maxBy<R = number>(key: (item: T) => R): T
    maxByOrNull<R = number>(key: (item: T) => R): T | null
  }
}

Array.prototype.max = function <T = number>(): number {
  if (this.length === 0) {
    throw new Error('Array is empty')
  }

  const array = this as T[] as unknown as number[]
  return Math.max(...array)
}

Array.prototype.maxOrNull = function <T = number>(): number | null {
  if (this.length === 0) {
    return null
  }

  const array = this as T[] as unknown as number[]
  return Math.max(...array)
}

Array.prototype.maxBy = function <T, R = number>(key: (item: T) => R): T {
  if (this.length === 0) {
    throw new Error('Array is empty')
  }

  const array = this.map((item) => key(item))
  const max = array.max()
  return this.find((item) => key(item) === max)
}

Array.prototype.maxByOrNull = function <T, R = number>(
  key: (item: T) => R
): T | null {
  if (this.length === 0) {
    return null
  }

  const array = this.map((item) => key(item))
  const max = array.max()
  return this.find((item) => key(item) === max)
}
