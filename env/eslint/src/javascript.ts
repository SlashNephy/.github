import type { Linter } from 'eslint'

/**
 * JavaScript 関連の eslint プリセット
 */
const javascript: Linter.Config = {
  extends: [
    'plugin:node/recommended',
    'plugin:import/recommended',
    'plugin:xss/recommended',
  ],
  plugins: ['promise', 'unused-imports'],
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
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
    // 特定の構文を禁止
    'no-restricted-syntax': [
      'error',
      // 数値リテラル以外での Array#at() の使用を禁止
      // https://qiita.com/printf_moriken/items/da03f55cb626617c1958
      {
        selector:
          // eslint-disable-next-line quotes
          "CallExpression[callee.property.name='at']:not([arguments.0.type='Literal'],[arguments.0.type='UnaryExpression'][arguments.0.argument.type='Literal'])",
        message: 'at method accepts only a literal argument',
      },
    ],
    // 非同期メソッドを優先
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',
    // 構文のバージョンチェックを無効化
    'node/no-unsupported-features/es-syntax': 'off',
    // 不正確な import チェックを無効化
    'node/no-missing-import': 'off',
    'node/no-extraneous-import': 'off',
    'node/no-unpublished-import': 'off',
    // foo["bar"] 👉 foo.bar
    'dot-notation': 'error',
    // {x: x} 👉 {x}
    'object-shorthand': ['error', 'always'],
  },
}

module.exports = javascript
