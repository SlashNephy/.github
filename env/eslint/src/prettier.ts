import type { Linter } from 'eslint'

/**
 * prettier 関連の eslint プリセット
 * - 特に eslint と競合しそうなルールを記述する
 * - prettier と eslint は競合するので最後に読み込む
 */
const prettier: Linter.Config = {
  extends: ['prettier'],
  rules: {
    // 基本インデントを 2 にする
    // switch-case でインデントを許可
    indent: ['error', 2, { SwitchCase: 1 }],
    // 改行コードを LF に
    'linebreak-style': ['error', 'unix'],
    // ダブルクォーテーションを禁止
    quotes: ['error', 'single'],
    // セミコロンを禁止
    semi: ['error', 'never'],
  },
}

module.exports = prettier
