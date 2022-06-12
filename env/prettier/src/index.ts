import type { Options } from 'prettier'

const prettier: Options = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  proseWrap: 'preserve',
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'css',
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
}

module.exports = prettier
