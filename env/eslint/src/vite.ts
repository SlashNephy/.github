import type { Linter } from 'eslint'

/**
 * Vite 関連の eslint プリセット
 */
const vite: Linter.Config = {
  parserOptions: {
    project: './tsconfig.node.json',
  },
}

module.exports = vite
