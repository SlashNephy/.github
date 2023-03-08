import type { Linter } from 'eslint'

/**
 * JavaScript 関連の eslint プリセット
 */
const javascript: Linter.Config = {
  extends: [
    'plugin:eslint-comments/recommended',
    'plugin:node/recommended',
    'plugin:import/recommended',
    'plugin:xss/recommended',
  ],
  plugins: ['promise', 'unused-imports'],
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 不要なルール無効化コメントを報告
    'eslint-comments/no-unused-disable': 'error',
    // default export を禁止
    'import/no-default-export': 'error',
    // アロー関数を優先
    'prefer-arrow-callback': 'error',
    // const a = function () { ... } を禁止
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
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
        // 組み込み → 外部依存 → 内部依存 → object → type の順にする
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
    'import/no-import-module-exports': 'off',
    'import/extensions': 'off',
    // foo["bar"] 👉 foo.bar
    'dot-notation': 'error',
    // {foo: foo} 👉 {foo}
    'object-shorthand': ['error', 'always'],
    // Array 系メソッドで return を強制
    'array-callback-return': ['error'],
    // ループ内では await を禁止
    'no-await-in-loop': 'error',
    // 操作が値に影響しない式を禁止
    'no-constant-binary-expression': 'error',
    // コンストラクター内で return を禁止
    'no-constructor-return': 'error',
    // 関数の返り値としての Promise executor を禁止
    'no-promise-executor-return': 'error',
    // 自身との比較 (e.g. foo === foo) を禁止
    'no-self-compare': 'error',
    // 非テンプレート文字列で ${foo} を禁止
    // "Hello, ${name}" 👉 `Hello, ${name}`
    'no-template-curly-in-string': 'error',
    // 更新されないループ条件を禁止
    'no-unmodified-loop-condition': 'error',
    // 到達できないループを禁止
    'no-unreachable-loop': 'error',
    // 未使用の private メンバーを禁止
    'no-unused-private-class-members': 'error',
    // スレッドセーフで安全に更新されないコードを禁止
    'require-atomic-updates': 'error',
    // func () 👉 func()
    'func-call-spacing': ['error', 'never'],
    // ペアになっていない setter を禁止
    'accessor-pairs': 'error',
    // キャメルケースに強制しない
    camelcase: 'off',
    // switch 文で default を強制しない
    'default-case': 'off',
    // default export を優先しない
    'import/prefer-default-export': 'off',
    // continue 文を許可
    'no-continue': 'off',
    // _ で始まるメンバー名を許可
    'no-underscore-dangle': 'off',
    // 自身より後に宣言されたメンバーの使用を許可
    'no-use-before-define': 'off',
    // console.* の使用を許可
    'no-console': 'off',
    // 深い三項演算子を許可
    'no-nested-ternary': 'off',
    // i++ インクリメントを許可
    'no-plusplus': 'off',
    // return の省略などを許可
    'consistent-return': 'off',
  },
}

module.exports = javascript
