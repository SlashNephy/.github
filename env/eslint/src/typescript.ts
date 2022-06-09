import type { Linter } from 'eslint'

/**
 * TypeScript 関連の eslint プリセット
 */
const typescript: Linter.Config = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'promise', 'unused-imports'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    project: './tsconfig.json',
  },
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  rules: {
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
    // import type を優先
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
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
    // *.js で 'use strick'; を強制
    strict: ['error', 'global'],
    // Array<T> 👉 T[]
    '@typescript-eslint/array-type': 'error',
    // (T) expr 👉 expr as T
    '@typescript-eslint/consistent-type-assertions': 'error',
    // 未ハンドルの Promise を警告
    '@typescript-eslint/no-floating-promises': 'warn',
    // require() を禁止
    '@typescript-eslint/no-require-imports': 'error',
    // Promise<T> を返す関数では async のマークを強制
    '@typescript-eslint/promise-function-async': 'error',
    // eval() を禁止
    '@typescript-eslint/no-implied-eval': 'error',
    // *.jsx 内で React の import がなくても OK
    'react/react-in-jsx-scope': 'off',
    // テンプレート文字列で undefined | null を許可
    '@typescript-eslint/restrict-template-expressions': 'off',
    // スコープ厳格化を解除
    '@typescript-eslint/unbound-method': 'off',
    // 暗黙の any からのキャストを許可
    '@typescript-eslint/no-unsafe-assignment': 'off',
    // return の返り値チェック厳格化を解除
    '@typescript-eslint/no-unsafe-return': 'off',
    // Promise の返り値チェック厳格化を解除
    '@typescript-eslint/no-misused-promises': 'off',
    // アクセス修飾子を強制
    '@typescript-eslint/explicit-member-accessibility': 'error',
  },
  overrides: [
    {
      // webpack.config.ts に必要な default export を許可
      files: ['**/webpack.config.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
}

module.exports = typescript
