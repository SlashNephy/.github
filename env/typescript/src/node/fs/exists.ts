import { lstat } from 'fs/promises'

export const existsAsync = async (path: string): Promise<boolean> => {
  try {
    await lstat(path)

    return true
  } catch {
    return false
  }
}
