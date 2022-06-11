import type { Linter } from 'eslint'

/**
 * JavaScript 関連の eslint プリセット
 */
const javascript: Linter.Config = {
  extends: ['plugin:import/recommended'],
  plugins: ['promise', 'unused-imports'],
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  rules: {
    // default export を禁止
    'import/no-default-export': 'error',
    // アロー関数を優先
    'prefer-arrow-callback': 'error',
    // const a = function () { ... } を禁止
    'func-style': [2, 'declaration', { allowArrowFunctions: true }],
    // 中括弧の省略を禁止
    curly: 'error',
    // テンプレート文字列を優先
    'prefer-template': 'error',
    // == 比較 👉 === 比較
    eqeqeq: 'error',
    // *.js で 'use strict'; を強制
    strict: ['error', 'global'],
    // import 順を並び替える
    'import/order': [
      'warn',
      {
        // 組み込み ← 外部依存 ← 内部依存 ← import type の順にする
        groups: [
          'builtin',
          'external',
          ['parent', 'sibling', 'index'],
          'object',
          'type',
          'unknown',
        ],
        // カテゴリー間に改行を入れる
        'newlines-between': 'always',
        // 大文字小文字区別なしで ABC 順にする
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          // **.css は最後に配置する
          {
            pattern: '**.css',
            group: 'type',
            position: 'after',
          },
        ],
        // **.css が import 順最後ではないときに警告
        warnOnUnassignedImports: true,
      },
    ],
    // 不要 import 文を禁止
    'unused-imports/no-unused-imports': 'error',
    // 不要な変数を禁止
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-vars': [
      'warn',
      // '_' で始まる変数を許可
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
}

module.exports = javascript
