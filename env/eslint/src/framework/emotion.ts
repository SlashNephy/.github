import type { Linter } from 'eslint'

/**
 * Emotion 関連の eslint プリセット
 */
module.exports = {
  plugins: ['@emotion', 'css-reorder'],
  rules: {
    '@emotion/pkg-renaming': 'error',
    '@emotion/styled-import': 'error',
    '@emotion/syntax-preference': 'error',
    'css-reorder/property-reorder': 'error',
    'react/no-unknown-property': [
      'error',
      {
        ignore: ['css'],
      },
    ],
  },
} satisfies Linter.Config
