import type { Linter } from 'eslint'

module.exports = {
  extends: ['plugin:package-json/recommended'],
  plugins: ['package-json'],
  env: {
    node: true,
  },
  rules: {
    'package-json/order-properties': [
      'error',
      [
        'name',
        'version',
        'type',
        'main',
        'private',
        'author',
        'description',
        'repository',
        'license',
        'files',
        'exports',
        'publishConfig',
        'scripts',
        'dependencies',
        'peerDependencies',
        'optionalDependencies',
        'bundledDependencies',
        'devDependencies',
        'packageManager',
        'engines',
        'eslintConfig',
      ],
    ],
  },
} satisfies Linter.Config
