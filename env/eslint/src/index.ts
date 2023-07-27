import { resolve } from 'path'

import type { Linter } from 'eslint'

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'standard', 'airbnb'],
  overrides: [
    // JavaScript / TypeScript
    {
      files: '**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      extends: resolve(__dirname, 'base/javascript.js'),
    },
    // TypeScript
    {
      files: '**/*.{ts,mts,cts,tsx}',
      extends: [resolve(__dirname, 'base/typescript.js')],
    },
    // jest / vitest
    {
      files: [
        '**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
        '**/test/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      ],
      extends: [
        resolve(__dirname, 'framework/jest.js'),
        resolve(__dirname, 'framework/vitest.js'),
      ],
    },
    // React
    {
      files: '**/*.{jsx,tsx}',
      extends: resolve(__dirname, 'framework/react.js'),
    },
    // Emotion
    {
      files: '**/*.{jsx,tsx}',
      extends: resolve(__dirname, 'framework/emotion.js'),
    },
    // Next.js
    {
      files: '**/pages/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      extends: resolve(__dirname, 'framework/next.js.js'),
    },
    // JSON 共通ルール
    {
      files: '**/*.json',
      extends: resolve(__dirname, 'base/json.js'),
    },
    // YAML 共通ルール
    {
      files: '**/*.{yml,yaml}',
      extends: resolve(__dirname, 'base/yaml.js'),
    },
    // package.json
    {
      files: '**/package.json',
      extends: resolve(__dirname, 'presets/package.json.js'),
    },
    // UserScript
    {
      files: '**/*.user.js',
      extends: resolve(__dirname, 'presets/userscript.js'),
    },
    // Node.js
    {
      files: [
        '**/bin/**/*.{js,mjs,cjs,ts,mts,cts}',
        '**/{webpack,rollup,vite}.config.{js,mjs,cjs,ts,mts,cts}',
      ],
      extends: resolve(__dirname, 'presets/node.js'),
    },
    // 構成ファイル
    {
      files: '**/{webpack,rollup,vite}.config.{js,mjs,cjs,ts,mts,cts}',
      extends: resolve(__dirname, 'presets/config.js'),
    },
    // 最後に prettier を適用
    {
      files: '**/*',
      extends: resolve(__dirname, 'base/style.js'),
    },
  ],
  ignorePatterns: ['**/node_modules/**'],
} satisfies Linter.Config
