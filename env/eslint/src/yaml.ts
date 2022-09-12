import type { Linter } from 'eslint'

const yaml: Linter.Config = {
  extends: ['plugin:yml/standard', 'plugin:yml/prettier'],
  parser: 'yaml-eslint-parser',
  rules: {
    'yml/quotes': ['error', { prefer: 'double' }],
  },
}

module.exports = yaml
