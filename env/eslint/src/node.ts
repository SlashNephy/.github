import type { Linter } from 'eslint'

const config: Linter.Config = {
  parserOptions: {
    // Node.js 用の tsconfig.json を参照
    project: './tsconfig.node.json',
  },
}

module.exports = config
