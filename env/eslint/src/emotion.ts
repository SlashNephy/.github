import type { Linter } from 'eslint'

/**
 * Emotion 関連の eslint プリセット
 */
const emotion: Linter.Config = {
  plugins: ['@emotion', 'css-reorder'],
  rules: {
    '@emotion/pkg-renaming': 'error',
    '@emotion/styled-import': 'error',
    '@emotion/syntax-preference': 'error',
    'css-reorder/property-reorder': 'error',
  },
}

module.exports = emotion
