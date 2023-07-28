import next from 'eslint-config-next'

import type { Linter } from 'eslint'

// https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js
module.exports = {
  extends: ['plugin:@next/next/recommended'],
  rules: {
    ...next.rules,
    'import/no-default-export': 'off',
  },
} satisfies Linter.Config
