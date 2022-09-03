import { resolve } from 'path'

import type { Linter } from 'eslint'

const config: Linter.Config = {
  root: true,
  overrides: [
    // JavaScript / TypeScript 共通ルール
    {
      files: '**/*.{js,jsx,ts,tsx}',
      extends: [
        resolve(__dirname, 'common.js'),
        resolve(__dirname, 'javascript.js'),
      ],
    },
    // TypeScript 共通ルール
    {
      files: '**/*.{ts,tsx}',
      extends: resolve(__dirname, 'typescript.js'),
    },
    // jest 共通ルール
    {
      files: ['**/*.test.{js,ts}', '**/test/**/*.{js,ts}'],
      extends: resolve(__dirname, 'jest.js'),
    },
    // React 共通ルール
    {
      files: ['**/*.{j,t}sx'],
      extends: resolve(__dirname, 'react.js'),
    },
    // UserScript
    {
      files: ['**/*.user.js'],
      extends: resolve(__dirname, 'userscript.js'),
    },
    // default export を例外的に許可
    {
      files: [
        // Webpack
        '**/webpack.config.{js,ts}',
        // rollup
        '**/rollup.config.{js,ts}',
        // Next.js
        '**/pages/**/*.{js,jsx,ts,tsx}',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    // 最後に prettier を適用
    {
      files: '**/*.{js,jsx,ts,tsx}',
      extends: resolve(__dirname, 'prettier.js'),
    },
  ],
}

module.exports = config
