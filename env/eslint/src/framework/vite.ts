import type { Linter } from 'eslint'

module.exports = {
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
} satisfies Linter.Config
