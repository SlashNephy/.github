export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T> {
    distinct(): T[]
    distinctBy<V>(key: (item: T) => V): T[]
  }
}

Array.prototype.distinct = function <T>(): T[] {
  const array = this as T[]

  return Array.from(new Set(array))
}

Array.prototype.distinctBy = function <T, V>(key: (item: T) => V): T[] {
  const array = this as T[]

  const map = new Map<V, T>()
  for (const item of array) {
    const keyValue = key(item)
    if (!map.has(keyValue)) {
      map.set(keyValue, item)
    }
  }

  return Array.from(map.values())
}
