import type { Linter } from 'eslint'

/**
 * React 関連の eslint プリセット
 */
const react: Linter.Config = {
  extends: [
    // https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js
    'next/core-web-vitals',
    'plugin:css-import-order/recommended',
  ],
  plugins: ['css-import-order'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
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
  },
  overrides: [
    {
      // Next.js に必要な default export を許可
      files: ['pages/**/*.{ts,tsx}'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
}

module.exports = react
