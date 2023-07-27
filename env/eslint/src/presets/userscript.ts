import type { Linter } from 'eslint'

/**
 * UserScript 開発用の eslint プリセット
 */
module.exports = {
  extends: ['plugin:userscripts/recommended'],
  rules: {
    'no-undef': 'off',
    'xss/no-mixed-html': 'off',
    'xss/no-location-href-assign': 'off',
    'userscripts/compat-grant': [
      'error',
      {
        requireAllCompatible: true,
      },
    ],
    'userscripts/compat-headers': [
      'error',
      {
        requireAllCompatible: true,
      },
    ],
  },
} satisfies Linter.Config
