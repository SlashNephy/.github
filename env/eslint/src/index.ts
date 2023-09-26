import { resolve } from 'path'

// https://github.com/microsoft/rushstack/tree/main/eslint/eslint-patch
import '@rushstack/eslint-patch/modern-module-resolution.js'
import { readGitignoreFiles } from 'eslint-gitignore'

import type { Linter } from 'eslint'

module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  ignorePatterns: [
    '**/node_modules/**',
    '**/.yarn/**',
    ...readGitignoreFiles(),
  ],
  overrides: [
    /*
     * 言語固有ルール
     */
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
    // JSON
    {
      files: '**/*.json',
      extends: resolve(__dirname, 'base/json.js'),
    },
    // YAML
    {
      files: '**/*.{yml,yaml}',
      extends: resolve(__dirname, 'base/yaml.js'),
    },

    /*
     * フレームワーク固有ルール
     */
    // React
    {
      files: '**/*.{jsx,tsx}',
      extends: resolve(__dirname, 'framework/react.js'),
    },
    // Relay
    {
      files: '**/*.{js,jsx,ts,tsx}',
      extends: resolve(__dirname, 'framework/relay.js'),
    },
    // Next.js
    {
      files: [
        // <= 12
        '**/pages/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
        // >= 13
        '**/src/app/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      ],
      extends: resolve(__dirname, 'framework/next.js.js'),
    },
    // Vite
    {
      files: '**/src/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
      extends: resolve(__dirname, 'framework/vite.js'),
    },
    // Emotion
    {
      files: '**/*.{jsx,tsx}',
      extends: resolve(__dirname, 'framework/emotion.js'),
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

    /*
     * 個別のプリセットルール
     */
    // React向け a11y
    {
      files: '**/*.{jsx,tsx}',
      extends: resolve(__dirname, 'presets/a11y.js'),
    },
    // Node.js
    {
      files: '**/bin/**/*.{js,mjs,cjs,ts,mts,cts}',
      extends: resolve(__dirname, 'presets/node.js'),
    },
    // Cloudflare Worker
    {
      files: ['**/src/worker.{js,ts}', '**/functions/**/*.{js,ts}'],
      extends: resolve(__dirname, 'presets/allow-default-export.js'),
    },
    // ビルドツールの構成ファイル
    {
      files: [
        '**/{webpack,rollup,vite}.config.{js,mjs,cjs,ts,mts,cts}',
        '**/codegen.{js,mjs,cjs,ts,mts,cts}',
      ],
      extends: [
        resolve(__dirname, 'presets/allow-default-export.js'),
        resolve(__dirname, 'presets/build-configuration.js'),
        resolve(__dirname, 'presets/node.js'),
      ],
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
    // コーディングスタイル
    {
      files: '**/*',
      extends: resolve(__dirname, 'presets/style.js'),
    },
  ],
} satisfies Linter.Config
