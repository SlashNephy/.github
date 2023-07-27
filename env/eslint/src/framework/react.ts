import type { Linter } from 'eslint'

/**
 * React 関連の eslint プリセット
 */
module.exports = {
  extends: [
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:css-import-order/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['css-import-order', 'react-refresh'],
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
    // props を並び替える
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'last',
        reservedFirst: true,
      },
    ],
    // JSX を .tsx でも使えるように
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    // props に対してスプレッド演算子を使えるように
    'react/jsx-props-no-spreading': 'off',
    // <></> を使えるように
    'react/jsx-no-useless-fragment': 'off',
    // defaultProps を使わない
    'react/require-default-props': 'off',
    'react-refresh/only-export-components': 'warn',
  },
  overrides: [
    {
      files: '**/*.jsx',
      rules: {
        'react/prop-types': 'error',
      },
    },
  ],
} satisfies Linter.Config
