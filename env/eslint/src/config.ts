import type { Linter } from 'eslint'

const config: Linter.Config = {
  rules: {
    'import/no-default-export': 'off',
    // import で devDependencies を許可
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
  },
}

module.exports = config
