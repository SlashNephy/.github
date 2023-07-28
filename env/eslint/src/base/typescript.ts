import type { Linter } from 'eslint'

/**
 * TypeScript 関連の eslint プリセット
 */
module.exports = {
  extends: [
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:import/typescript',
    'plugin:no-void-return-type/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['@typescript-eslint', 'deprecation', 'tsdoc'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    lib: ['esnext'],
    project: './tsconfig.json',
    warnOnUnsupportedTypeScriptVersion: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.mts', '.cts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
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
      // 型名 / 列挙型のメンバーは PascalCase
      {
        selector: ['typeLike', 'enumMember'],
        format: ['StrictPascalCase'],
      },
      // 変数名は camelCase
      {
        selector: ['variableLike'],
        format: ['strictCamelCase', 'StrictPascalCase'],
        leadingUnderscore: 'allow',
      },
      // export された定数は UPPER_CASE を許容
      {
        selector: ['variable'],
        modifiers: ['const', 'global', 'exported'],
        format: ['strictCamelCase', 'StrictPascalCase', 'UPPER_CASE'],
      },
      // プロパティーに snake_case / UPPER_CASE を許容
      {
        selector: ['property'],
        format: ['strictCamelCase', 'snake_case', 'UPPER_CASE'],
      },
      // Boolean は特定のプレフィックスを強制
      {
        selector: ['variable'],
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
          'enable',
          'disable',
          'show',
          'hide',
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
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/unbound-method': 'off',
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
    // 過激なルールを無効化
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    // Deprecated されたコードの使用を禁止
    'deprecation/deprecation': 'error',
    // import に拡張子を推奨
    'import/extensions': [
      'warn',
      'always',
      {
        ignorePackages: true,
      },
    ],
    // TSDoc
    'tsdoc/syntax': 'warn',
  },
} satisfies Linter.Config
