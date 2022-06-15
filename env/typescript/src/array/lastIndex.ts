import { defineProperty } from '../property'

export {}

declare global {
  interface Array<T> {
    readonly lastIndex: number
  }
}

defineProperty(Array.prototype, 'lastIndex', function (array) {
  return array.length - 1
})
