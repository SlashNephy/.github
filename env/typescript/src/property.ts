export const defineProperty = <T, R>(
  object: T,
  name: string,
  value: (obj: T) => R
) => {
  if (name in object) {
    return
  }

  Object.defineProperty(object, name, {
    get() {
      return value(this)
    },
  })
}
