export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array<T> {
    groupBy<K>(key: (item: T, index: number) => K): Map<K, T[]>
  }
}

Array.prototype.groupBy = function <T, K>(
  key: (item: T, index: number) => K
): Map<K, T[]> {
  const array = this as T[]

  return array.reduce((map, item, index) => {
    const groupKey = key(item, index)

    const groupValues = map.get(groupKey) ?? []
    groupValues.push(item)
    map.set(groupKey, groupValues)

    return map
  }, new Map<K, T[]>())
}
