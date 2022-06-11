import type { Linter } from 'eslint'

/**
 * 言語・フレームワークに関わらない eslint プリセット
 */
const common: Linter.Config = {
  extends: ['eslint:recommended'],

  // 不要なルール無効化コメントを報告
  reportUnusedDisableDirectives: true,
}

module.exports = common
