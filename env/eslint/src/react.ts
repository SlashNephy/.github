import type { Linter } from 'eslint'

/**
 * React 関連の eslint プリセット
 */
const react: Linter.Config = {
  extends: [
    // https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:css-import-order/recommended',
  ],
  plugins: ['css-import-order'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    jsxPragma: 'React',
    lib: ['dom'],
  },
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // <div flag={true} /> 👉 <div flag />
    'react/jsx-boolean-value': 'error',
    // <div value={'test'} /> 👉 <div value='test' />
    'react/jsx-curly-brace-presence': 'error',
    // <div></div> 👉 <div />
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    // コンポーネント名を PascalCase に強制
    'react/jsx-pascal-case': 'error',
    // https://recoiljs.org/docs/introduction/installation/#eslint
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)',
      },
    ],
    // ハンドラーの名前規則
    'react/jsx-handler-names': 'error',
    // useState の分解宣言 & setXXX という名前を強制
    'react/hook-use-state': 'error',
    // <React.Fragment /> 👉 </>
    'react/jsx-fragments': 'error',
    // ステートレス関数を優先
    'react/prefer-stateless-function': 'error',
  },
  overrides: [
    {
      files: '**/*.jsx',
      rules: {
        'react/prop-types': 'error',
      },
    },
  ],
}

module.exports = react
