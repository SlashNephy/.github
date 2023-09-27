export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T = number> {
    average(): T
  }
}

Array.prototype.average = function <T = number>(): number {
  const array = this as T[] as unknown as number[]

  return Math.max(...array)
}
