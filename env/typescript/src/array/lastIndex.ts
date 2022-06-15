import { defineProperty } from '../property'

export {}

declare global {
  interface Array<T> {
    readonly lastIndex: number
  }
}

defineProperty(Array.prototype, 'lastIndex', (array) => {
  return array.length - 1
})
