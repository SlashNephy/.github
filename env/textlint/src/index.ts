import type { TextlintConfig } from './type'

const config: TextlintConfig = {
  rules: {
    // https://github.com/textlint-rule/textlint-rule-no-todo
    'no-todo': true,
    // https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing
    'preset-ja-technical-writing': true,
    // https://github.com/textlint-ja/textlint-rule-preset-JTF-style
    'preset-jtf-style': true,
    // https://github.com/textlint-ja/textlint-rule-preset-ja-spacing
    'preset-ja-spacing': true,
  },
}

module.exports = config
