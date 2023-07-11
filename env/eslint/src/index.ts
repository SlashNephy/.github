import { resolve } from 'path'

import type { Linter } from 'eslint'

const config: Linter.Config = {
  root: true,
  extends: ['eslint:recommended', 'standard', 'airbnb'],
  overrides: [
    // JavaScript / TypeScript
    {
      files: '**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      extends: resolve(__dirname, 'javascript.js'),
    },
    // TypeScript
    {
      files: '**/*.{ts,mts,cts,tsx}',
      extends: [
        resolve(__dirname, 'typescript.js'),
        'plugin:storybook/recommended',
      ],
    },
    // jest / vitest
    {
      files: [
        '**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
        '**/test/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      ],
      extends: [resolve(__dirname, 'jest.js'), resolve(__dirname, 'vitest.js')],
    },
    // React
    {
      files: '**/*.{jsx,tsx}',
      extends: resolve(__dirname, 'react.js'),
    },
    // Emotion
    {
      files: '**/*.{jsx,tsx}',
      extends: resolve(__dirname, 'emotion.js'),
    },
    // Next.js
    {
      files: '**/pages/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      extends: resolve(__dirname, 'next.js.js'),
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
    // Node.js
    {
      files: [
        '**/bin/**/*.{js,mjs,cjs,ts,mts,cts}',
        '**/{webpack,rollup,vite}.config.{js,mjs,cjs,ts,mts,cts}',
      ],
      extends: resolve(__dirname, 'node.js'),
    },
    // 構成ファイル
    {
      files: '**/{webpack,rollup,vite}.config.{js,mjs,cjs,ts,mts,cts}',
      extends: resolve(__dirname, 'config.js'),
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
