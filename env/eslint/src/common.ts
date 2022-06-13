import type { Linter } from 'eslint'

/**
 * 言語・フレームワークに関わらない eslint プリセット
 */
const common: Linter.Config = {
  extends: ['eslint:recommended', 'plugin:eslint-comments/recommended'],
  rules: {
    // 不要なルール無効化コメントを報告
    'eslint-comments/no-unused-disable': 'error',
  },
}

module.exports = common
