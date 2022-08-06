import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

import type { RollupOptions } from 'rollup'

export const buildOptions = (banner: Banner): RollupOptions => {
  return {
    input: `src/${banner.id}.ts`,
    output: {
      banner: buildBanner(banner),
      file: `dist/${banner.id}.user.js`,
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
  id: string
  name: string
  namespace?: string
  version: string
  description: string
  author: string
  match: string
  includes?: string[]
  icon?: string
  license?: string
  connect?: string[]
  grant?: string
  runAt?: string
  requires?: string[]
}

const buildBanner = (banner: Banner): string => {
  const lines: string[] = [
    '// ==UserScript==',
    `// @name         ${banner.name}`,
    `// @namespace    ${banner.namespace ?? 'https://tampermonkey.net/'}`,
    `// @version      ${banner.version}`,
    `// @description  ${banner.description}`,
    `// @author       ${banner.author}`,
    `// @match        ${banner.match}`,
    `// @license      ${banner.license ?? 'MIT license'}`,
    `// @grant        ${banner.grant ?? 'none'}`,
    `// @downloadURL  https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/${banner.id}.user.js`,
    `// @updateURL    https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/${banner.id}.user.js`,
  ]

  if (banner.icon) {
    lines.push(`// @icon         ${banner.icon}`)
  }

  if (banner.connect) {
    for (const connect of banner.connect) {
      lines.push(`// @connect      ${connect}`)
    }
  }

  if (banner.runAt) {
    lines.push(`// @run-at       ${banner.runAt}`)
  }

  if (banner.includes) {
    for (const include of banner.includes) {
      lines.push(`// @include      ${include}`)
    }
  }

  if (banner.requires) {
    for (const require of banner.requires) {
      lines.push(`// @require      ${require}`)
    }
  }

  lines.push('// ==/UserScript==')
  return lines.join('\n')
}
