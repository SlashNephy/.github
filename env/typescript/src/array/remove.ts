export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T> {
    remove(item: T): boolean
    removeAt(index: number): void
  }
}

Array.prototype.remove = function <T>(target: T): boolean {
  const array = this as T[]
  if (target === null || target === undefined) {
    return false
  }

  const index = array.indexOf(target)
  if (index < 0) {
    return false
  }

  array.splice(index, 1)

  return true
}

Array.prototype.removeAt = function <T>(index: number) {
  const array = this as T[]
  if (index < 0 || array.length <= index) {
    return
  }

  array.splice(index, 1)
}
