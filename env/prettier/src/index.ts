import type { Config } from 'prettier'

module.exports = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  proseWrap: 'preserve',
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'css',
  quoteProps: 'as-needed',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  overrides: [
    {
      files: ['**/*.yaml', '**/*.yml'],
      options: {
        singleQuote: false,
      },
    },
    // GitHub Workflow でダブルクォートが使えない場合があるのでシングルに統一
    // https://github.com/actions/runner/issues/866
    {
      files: ['.github/workflows/*.yaml', '.github/workflows/*.yml'],
      options: {
        singleQuote: true,
      },
    },
  ],
} satisfies Config
