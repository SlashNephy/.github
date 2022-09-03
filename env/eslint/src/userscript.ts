import type { Linter } from 'eslint'

/**
 * UserScript 開発用の eslint プリセット
 */
const userScript: Linter.Config = {
  extends: ['plugin:userscripts/recommended'],
  rules: {
    'no-undef': 'off',
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
}

module.exports = userScript
