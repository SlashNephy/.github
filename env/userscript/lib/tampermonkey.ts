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
  const lines: (string | string[] | undefined)[] = [
    '// ==UserScript==',
    `// @name         ${banner.name}`,
    `// @namespace    ${banner.namespace ?? 'https://tampermonkey.net/'}`,
    `// @version      ${banner.version}`,
    `// @description  ${banner.description}`,
    `// @author       ${banner.author}`,
    `// @match        ${banner.match}`,
    `// @license      ${banner.license ?? 'MIT license'}`,
    `// @grant        ${banner.grant ?? 'none'}`,
    banner.icon && `// @icon         ${banner.icon}`,
    banner.connect?.map((x) => `// @connect      ${x}`),
    banner.runAt && `// @run-at       ${banner.runAt}`,
    banner.includes?.map((x) => `// @include      ${x}`),
    banner.requires?.map((x) => `// @require      ${x}`),
    `// @downloadURL  https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/${banner.id}.user.js`,
    `// @updateURL    https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/${banner.id}.user.js`,
    '// ==/UserScript==',
  ]

  return lines
    .filter((line) => line)
    .map((line) => {
      if (Array.isArray(line)) {
        return line.join('\n')
      } else {
        return line
      }
    })
    .join('\n')
}
