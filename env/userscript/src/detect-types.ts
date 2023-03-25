const escapeKey = (key: string): string => {
  if (key.includes('.')) {
    return `'${key}'`
  }

  return key
}

const getTypeString = (value: unknown): string => {
  // null
  if (value === null) {
    return 'null'
  }

  // array
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return 'unknown[]'
    }

    const types = Array.from(new Set(value.map(getTypeString)))
    if (types.length > 1) {
      return `(${types.join(' | ')})[]`
    }

    return `${types.at(0)}[]`
  }

  switch (typeof value) {
    case 'object': {
      const entries = Object.entries(value)
      if (entries.length === 0) {
        // eslint-disable-next-line xss/no-mixed-html
        return 'Record<string, unknown>'
      }

      return `{${entries.map(([k, v]) => `${escapeKey(k)}: ${getTypeString(v)}`).join(', ')}}`
    }
    case 'function':
      // TODO
      return 'Function'
    default:
      return typeof value
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
;(unsafeWindow as any).getTypeString = getTypeString
;(unsafeWindow as any).printTypeString = (value: unknown) => {
  console.log(getTypeString(value))
}
/* eslint-enable @typescript-eslint/no-explicit-any */
