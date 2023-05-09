export const defineProperty = <T extends object, R>(
  object: T,
  name: string,
  value: (obj: T) => R
): void => {
  if (name in object) {
    return
  }

  Object.defineProperty(object, name, {
    get() {
      return value(this as T)
    },
  })
}
