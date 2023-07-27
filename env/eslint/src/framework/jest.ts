import type { Linter } from 'eslint'

/**
 * jest 関連の eslint プリセット
 */
module.exports = {
  plugins: ['jest'],
  extends: [
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/recommended',
  ],
  env: {
    'jest/globals': true,
  },
  rules: {},
} satisfies Linter.Config
