declare class RGB {
  constructor(r?: number, g?: number, b?: number, opacity?: number)
  r: number
  g: number
  b: number
  opacity: number
  get string(): string
  clone(): RGB
}
