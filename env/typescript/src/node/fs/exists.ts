import { lstat } from 'fs/promises'

export const existsAsync = async (path: string): Promise<boolean> => {
  try {
    return !!(await lstat(path))
  } catch {
    return false
  }
}
