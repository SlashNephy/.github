export const defineProperty = <T, R>(
  object: T,
  name: string,
  value: (obj: T) => R
) => {
  if (name in object) {
    return
  }

  Object.defineProperty(object, name, {
    writable: false,
    get() {
      return value(this)
    },
  })
}

export const defineConstant = <T, R>(object: T, name: string, value: R) => {
  if (name in object) {
    return
  }

  Object.defineProperty(object, name, {
    writable: false,
    value,
  })
}
