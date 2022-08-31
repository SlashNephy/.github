import { resolve } from 'path'

import type { Linter } from 'eslint'

const config: Linter.Config = {
  root: true,
  overrides: [
    {
      files: ['**/*.js'],
      extends: [
        resolve(__dirname, 'common.js'),
        resolve(__dirname, 'javascript.js'),
        resolve(__dirname, 'prettier.js'),
      ],
    },
    {
      files: ['**/*.ts'],
      extends: [
        resolve(__dirname, 'common.js'),
        resolve(__dirname, 'javascript.js'),
        resolve(__dirname, 'typescript.js'),
        resolve(__dirname, 'prettier.js'),
      ],
    },
    {
      files: ['**/*.test.ts', '**/test/**/*.ts'],
      extends: [resolve(__dirname, 'jest.js')],
    },
    {
      files: ['**/*.tsx'],
      extends: [
        resolve(__dirname, 'common.js'),
        resolve(__dirname, 'javascript.js'),
        resolve(__dirname, 'typescript.js'),
        resolve(__dirname, 'react.js'),
        resolve(__dirname, 'prettier.js'),
      ],
    },
    // default export を許可
    {
      files: [
        // Webpack
        '**/webpack.config.ts',
        // rollup
        '**/rollup.config.ts',
        // Next.js
        '**/pages/**/*.{ts,tsx}',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
}

module.exports = config
