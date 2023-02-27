import { resolve } from 'path'

import type { Linter } from 'eslint'

const config: Linter.Config = {
  root: true,
  extends: ['eslint:recommended', 'airbnb'],
  overrides: [
    // JavaScript / TypeScript 共通ルール
    {
      files: '**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      extends: resolve(__dirname, 'javascript.js'),
    },
    // TypeScript 共通ルール
    {
      files: '**/*.{ts,mts,cts,tsx}',
      extends: resolve(__dirname, 'typescript.js'),
    },
    // jest / vitest 共通ルール
    {
      files: [
        '**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
        '**/test/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      ],
      extends: [resolve(__dirname, 'jest.js'), resolve(__dirname, 'vitest.js')],
    },
    // React 共通ルール
    {
      files: '**/*.{jsx,tsx}',
      extends: resolve(__dirname, 'react.js'),
    },
    // Emotion 共通ルール
    {
      files: '**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      extends: resolve(__dirname, 'emotion.js'),
    },
    // JSON 共通ルール
    {
      files: '**/*.json',
      extends: resolve(__dirname, 'json.js'),
    },
    // YAML 共通ルール
    {
      files: '**/*.{yml,yaml}',
      extends: resolve(__dirname, 'yaml.js'),
    },
    // package.json
    {
      files: '**/package.json',
      extends: resolve(__dirname, 'package.json.js'),
    },
    // UserScript
    {
      files: '**/*.user.js',
      extends: resolve(__dirname, 'userscript.js'),
    },
    // Vite
    {
      files: '**/vite.config.{js,ts}',
      extends: resolve(__dirname, 'vite.js'),
    },
    // default export を例外的に許可
    {
      files: [
        // Webpack
        '**/webpack.config.{js,ts}',
        // rollup
        '**/rollup.config.{js,ts}',
        // Vite
        '**/vite.config.{js,ts}',
        // Next.js
        '**/pages/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      ],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    // 最後に prettier を適用
    {
      files: '**/*',
      extends: resolve(__dirname, 'prettier.js'),
    },
  ],
  ignorePatterns: ['**/node_modules/**'],
}

module.exports = config
