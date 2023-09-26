import type { Linter } from 'eslint'

module.exports = {
  extends: ['plugin:relay/recommended'],
  plugins: ['relay'],
  rules: {
    // 未使用の GraphQL フィールドを禁止
    'relay/unused-fields': 'error',
  },
} satisfies Linter.Config
