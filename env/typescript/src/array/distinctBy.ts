export {}

declare global {
  interface Array<T> {
    distinctBy<V>(key: (item: T) => V): T[]
  }
}

Array.prototype.distinctBy = function <T, V>(key: (item: T) => V): T[] {
  const array = this as T[]

  const map = new Map<any, T>()
  for (const item of array) {
    const keyValue = key(item)
    if (!map.has(keyValue)) {
      map.set(keyValue, item)
    }
  }

  return Array.from(map.values())
}
