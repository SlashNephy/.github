import type { Linter } from 'eslint'

module.exports = {
  rules: {
    // import で devDependencies を許可
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
  },
} satisfies Linter.Config
