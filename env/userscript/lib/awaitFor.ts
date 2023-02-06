export type Predicate = () => boolean

export const awaitFor = async (predicate: Predicate): Promise<void> => {
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (predicate()) {
        clearInterval(timer)
        resolve()
      }
    }, 500)
  })
}
