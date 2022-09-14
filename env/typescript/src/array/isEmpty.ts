export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array {
    isEmpty(): boolean
    isNotEmpty(): boolean
  }
}

Array.prototype.isEmpty = function (): boolean {
  return this.length === 0
}

Array.prototype.isEmpty = function (): boolean {
  return !this.isEmpty()
}
