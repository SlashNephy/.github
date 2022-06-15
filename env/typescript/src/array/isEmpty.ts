export {}

declare global {
  interface Array<T> {
    isEmpty(): boolean
    isNotEmpty(): boolean
  }
}

Array.prototype.isEmpty = function <T>(): boolean {
  return this.length === 0
}

Array.prototype.isEmpty = function <T>(): boolean {
  return !this.isEmpty()
}
