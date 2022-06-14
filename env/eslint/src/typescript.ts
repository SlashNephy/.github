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
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    project: './tsconfig.json',
  },
  rules: {
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
    // import type を優先
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
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
    // unsafe 系を緩める
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
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
