import { defineProperty } from '../property'

// eslint-disable-next-line @typescript-eslint/no-useless-empty-export
export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Array {
    readonly lastIndex: number
  }
}

defineProperty(Array.prototype, 'lastIndex', (array) => array.length - 1)
