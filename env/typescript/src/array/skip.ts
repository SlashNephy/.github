export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T> {
    skip(count: number): T[]
  }
}

Array.prototype.skip = function <T>(count: number): T[] {
  const array = this as T[]

  return array.slice(count)
}
