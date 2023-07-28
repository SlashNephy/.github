// @ts-expect-error Linter.Config
import airbnb from 'eslint-config-airbnb/rules/react-a11y'

import type { Linter } from 'eslint'

module.exports = {
  extends: ['plugin:jsx-a11y/recommended'],
  plugins: ['jsx-a11y'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    ...airbnb.rules,
    'jsx-a11y/alt-text': [
      'warn',
      {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: ['Image'],
        object: [],
        area: [],
        'input[type="image"]': [],
      },
    ],
  },
} satisfies Linter.Config
