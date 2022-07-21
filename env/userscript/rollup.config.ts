import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

import type { RollupOptions } from 'rollup'

const buildOptions = (name: string, banner: Banner): RollupOptions => {
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

type Banner = {
  name: string
  namespace: string
  version: string
  description: string
  author: string
  match: string
  connect?: string
  grant?: string
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
    `// @grant        ${banner.connect ?? 'none'}`,
  ]

  if (banner.connect) {
    lines.push(`// @connect      ${banner.connect}`)
  }

  lines.push('// ==/UserScript==')
  return lines.join('\n')
}

const config: RollupOptions[] = [
  buildOptions('annict-work-links', {
    name: 'Annict の作品ページに各種サイトへのリンクを表示する',
    namespace: 'https://annict.com/',
    version: '0.1',
    description: 'しょぼいカレンダー、MyAnimeList、AniList に対応しています。',
    author: 'SlashNephy <spica@starry.blue>',
    match: 'https://annict.com/works/*',
    connect: 'raw.githubusercontent.com',
    grant: 'GM_xmlhttpRequest',
  }),
  buildOptions('dominion-online-auto-table-setter', {
    name: 'dominion.games Auto Table Setter',
    namespace: 'https://dominion.games/',
    version: '0.2',
    description: 'Automatically sets up dominion.games table config.',
    author: 'SlashNephy <spica@starry.blue>',
    match: 'https://dominion.games/',
  }),
]

export default config
