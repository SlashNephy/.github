export type Predicate = () => boolean

export const awaitFor = async (predicate: Predicate, timeout?: number): Promise<void> =>
  new Promise((resolve, reject) => {
    let timer: number

    const interval = window.setInterval(() => {
      if (predicate()) {
        clearInterval(interval)
        clearTimeout(timer)
        resolve()
      }
    }, 500)

    if (timeout !== undefined) {
      timer = window.setTimeout(() => {
        clearInterval(interval)
        clearTimeout(timer)
        reject(new Error('timeout'))
      }, timeout)
    }
  })

export async function awaitElement<E extends Element>(selectors: string): Promise<E> {
  return new Promise((resolve) => {
    const element = document.querySelector<E>(selectors)
    if (element !== null) {
      resolve(element)
      return
    }

    const observer = new MutationObserver(() => {
      const e = document.querySelector<E>(selectors)
      if (e !== null) {
        resolve(e)
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}
