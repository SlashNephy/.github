export {}

declare global {
  interface Array<T> {
    isEmpty(): boolean
  }
}

Array.prototype.isEmpty = function <T>(): boolean {
  return this.length === 0
}
