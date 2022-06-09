import { resolve } from 'path'

import type { Linter } from 'eslint'

const config: Linter.Config = {
  root: true,
  overrides: [
    {
      files: ['**/*.ts'],
      extends: [
        resolve(__dirname, 'common.js'),
        resolve(__dirname, 'typescript.js'),
        resolve(__dirname, 'prettier.js'),
      ],
    },
    {
      files: ['**/*.tsx'],
      extends: [
        resolve(__dirname, 'common.js'),
        resolve(__dirname, 'typescript.js'),
        resolve(__dirname, 'react.js'),
        resolve(__dirname, 'prettier.js'),
      ],
    },
  ],
}

module.exports = config
