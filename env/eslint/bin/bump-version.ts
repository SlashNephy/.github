import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { cwd } from 'process'

const bumpVersion = async () => {
  const path = join(cwd(), 'package.json')
  const content = await readFile(path, 'utf-8')
  const packageJson = JSON.parse(content) as { version: string }

  const [major, minor, patch] = packageJson.version.split('.')
  const patchNumber = parseInt(patch)
  packageJson.version = `${major}.${minor}.${patchNumber + 1}`

  await writeFile(path, JSON.stringify(packageJson, null, 2))
}

bumpVersion().catch(console.error)
