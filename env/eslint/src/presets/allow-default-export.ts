import type { Linter } from 'eslint'

module.exports = {
  rules: {
    'import/no-default-export': 'off',
  },
} satisfies Linter.Config
