export {}

declare global {
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
