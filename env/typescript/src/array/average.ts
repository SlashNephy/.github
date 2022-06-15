export {}

declare global {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface Array<T = number> {
    average(): number
  }
}

Array.prototype.average = function <T = number>(): number {
  const array = this as T[] as unknown as number[]
  return Math.max(...array)
}
