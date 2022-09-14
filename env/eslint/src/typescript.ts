import type { Linter } from 'eslint'

/**
 * TypeScript 関連の eslint プリセット
 */
const typescript: Linter.Config = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    lib: ['esnext'],
    project: './tsconfig.json',
    warnOnUnsupportedTypeScriptVersion: true,
  },
  rules: {
    /**
     * Automatically fixable は error にする
     */
    // interface 👉 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    // export type を優先
    '@typescript-eslint/consistent-type-exports': [
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    // import type を優先
    '@typescript-eslint/consistent-type-imports': 'error',
    // クラスのアクセス修飾子を強制
    '@typescript-eslint/explicit-member-accessibility': 'error',
    // export されているメンバーや public メンバーは型を明示させる
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/method-signature-style': ['warn', 'method'],
    // 命名規則を強制
    '@typescript-eslint/naming-convention': [
      'warn',
      // デフォルトは camelCase
      {
        selector: ['default'],
        format: ['strictCamelCase'],
      },
      // 型名は PascalCase
      {
        selector: ['typeLike'],
        format: ['StrictPascalCase'],
      },
      // 変数名は camelCase
      {
        selector: ['variableLike'],
        format: ['strictCamelCase'],
        leadingUnderscore: 'allow',
      },
      // export された定数は UPPER_CASE / PascalCase を許容
      {
        selector: ['variable'],
        modifiers: ['const', 'global', 'exported'],
        format: ['strictCamelCase', 'UPPER_CASE', 'StrictPascalCase'],
      },
      // プロパティーに snake_case / UPPER_CASE を許容
      {
        selector: ['property'],
        format: ['strictCamelCase', 'snake_case', 'UPPER_CASE'],
      },
      // Boolean は特定のプレフィックスを強制
      {
        selector: ['variableLike'],
        types: ['boolean'],
        format: ['StrictPascalCase'],
        prefix: [
          'is',
          'are',
          'was',
          'were',
          'should',
          'has',
          'can',
          'did',
          'will',
          'contains',
        ],
      },

      // プライベートメンバーは _ で始める
      {
        selector: ['memberLike'],
        modifiers: ['private'],
        format: ['strictCamelCase'],
        leadingUnderscore: 'require',
      },
      // deconstruct で宣言された変数は許容
      {
        selector: ['variableLike'],
        modifiers: ['destructured'],
        format: null,
      },
      // オブジェクトのキーなど '' 付きの宣言は許容
      {
        selector: ['memberLike', 'property'],
        modifiers: ['requiresQuotes'],
        format: null,
      },
    ],
    // void を式の値として禁止
    '@typescript-eslint/no-confusing-void-expression': 'error',
    // DEPRECATED: 代わりに tsconfig.json で "useUnknownInCatchVariables": true を使用
    '@typescript-eslint/no-implicit-any-catch': 'error',
    // 重複した型定義を禁止
    // boolean | false 👉 boolean
    '@typescript-eslint/no-redundant-type-constituents': 'warn',
    // require() を禁止
    '@typescript-eslint/no-require-imports': 'warn',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-useless-empty-export': 'error',
    // パラメーターでのプロパティ宣言を強制
    '@typescript-eslint/parameter-properties': [
      'warn',
      {
        allow: [
          'readonly',
          'private',
          'protected',
          'public',
          'private readonly',
          'protected readonly',
          'public readonly',
        ],
        prefer: 'parameter-property',
      },
    ],
    '@typescript-eslint/prefer-enum-initializers': 'warn',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-regexp-exec': 'error',
    // Promise<T> を返す関数では async のマークを強制
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/require-array-sort-compare': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unbound-method': 'off',
    // テンプレート文字列で number | boolean | undefined | null を許可
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowNumber: true,
        allowBoolean: true,
        allowNullish: true,
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
  },
}

module.exports = typescript
