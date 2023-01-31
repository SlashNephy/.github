import type { Linter } from 'eslint'

/**
 * vitest 関連の eslint プリセット
 */
const vitest: Linter.Config = {
  plugins: ['vitest'],
  rules: {},
}

module.exports = vitest
