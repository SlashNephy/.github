import type { Linter } from 'eslint'

module.exports = {
  parserOptions: {
    // Node.js 用の tsconfig.json を参照
    project: './tsconfig.node.json',
  },
} satisfies Linter.Config
