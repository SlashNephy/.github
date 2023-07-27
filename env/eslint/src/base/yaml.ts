import type { Linter } from 'eslint'

module.exports = {
  extends: ['plugin:yml/standard', 'plugin:yml/prettier'],
  parser: 'yaml-eslint-parser',
  rules: {
    'yml/quotes': ['error', { prefer: 'double' }],
  },
  overrides: [
    // GitHub Workflow でダブルクォートが使えない場合があるのでシングルに統一
    // https://github.com/actions/runner/issues/866
    {
      files: '.github/workflows/*.{yml,yaml}',
      rules: {
        'yml/quotes': ['error', { prefer: 'single' }],
      },
    },
  ],
} satisfies Linter.Config
