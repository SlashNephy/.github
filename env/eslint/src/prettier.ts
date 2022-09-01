import type { Linter } from 'eslint'

/**
 * prettier 関連の eslint プリセット
 * - 特に eslint と競合しそうなルールを記述する
 * - prettier と eslint は競合するので最後に読み込む
 */
const prettier: Linter.Config = {
  extends: ['plugin:editorconfig/noconflict', 'prettier'],
  plugins: ['editorconfig'],
  rules: {
    // インデント
    // - 基本インデントを 2 にする
    // - switch-case でインデントを許可
    // indent: ['error', 2, { SwitchCase: 1 }],
    // 詳細なインデントは競合するので無効にして prettier に任せる

    // 改行コードを LF に
    'linebreak-style': ['error', 'unix'],
    // ダブルクォーテーションを禁止
    quotes: ['error', 'single'],
    // セミコロンを禁止
    semi: ['error', 'never'],
    // UTF-8 BOM を禁止
    'unicode-bom': ['error', 'never'],
    // 最終行に改行を挿入
    'eol-last': ['error', 'always'],
    // 行末のスペースを禁止
    'no-trailing-spaces': ['error'],
  },
}

module.exports = prettier
