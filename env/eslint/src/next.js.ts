import type { Linter } from 'eslint'

const config: Linter.Config = {
  extends: [
    // https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js
    'next/core-web-vitals',
  ],
  rules: {
    'import/no-default-export': 'off',
  },
}

module.exports = config
