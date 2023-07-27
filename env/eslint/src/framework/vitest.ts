import type { Linter } from 'eslint'

/**
 * vitest 関連の eslint プリセット
 */
module.exports = {
  plugins: ['vitest'],
  rules: {},
} satisfies Linter.Config
