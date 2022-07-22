import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

import type { RollupOptions } from 'rollup'

export const buildOptions = (name: string, banner: Banner): RollupOptions => {
  return {
    input: `src/${name}.ts`,
    output: {
      banner: buildBanner(banner),
      file: `dist/${name}.user.js`,
    },
    plugins: [
      typescript(),
      babel({
        babelHelpers: 'bundled',
      }),
    ],
  }
}

export type Banner = {
  name: string
  namespace: string
  version: string
  description: string
  author: string
  match: string
  connect?: string
  grant?: string
  runAt?: string
}

const buildBanner = (banner: Banner): string => {
  const lines: string[] = [
    '// ==UserScript==',
    `// @name         ${banner.name}`,
    `// @namespace    ${banner.namespace}`,
    `// @version      ${banner.version}`,
    `// @description  ${banner.description}`,
    `// @author       ${banner.author}`,
    `// @match        ${banner.match}`,
    `// @grant        ${banner.grant ?? 'none'}`,
  ]

  if (banner.connect) {
    lines.push(`// @connect      ${banner.connect}`)
  }

  if (banner.runAt) {
    lines.push(`// @run-at       ${banner.runAt}`)
  }

  lines.push('// ==/UserScript==')
  return lines.join('\n')
}
