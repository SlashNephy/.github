export type Predicate = () => boolean

export const awaitFor = async (predicate: Predicate, timeout?: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    let timer: number | NodeJS.Timer

    const interval = window.setInterval(() => {
      if (predicate()) {
        clearInterval(interval)
        clearTimeout(timer)
        resolve()
      }
    }, 500)

    if (timeout !== undefined) {
      timer = setTimeout(() => {
        clearInterval(interval)
        clearTimeout(timer)
        reject(new Error('timeout'))
      }, timeout)
    }
  })
}
