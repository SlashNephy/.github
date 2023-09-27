export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T> {
    take(count: number): T[]
  }
}

Array.prototype.take = function <T>(count: number): T[] {
  const array = this as T[]

  return array.slice(0, count)
}
