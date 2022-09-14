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
} & TampermonkeyHeader

type InternationalizationStrings = Record<string, string> & { en: string; ja?: string }

type TampermonkeyGrant =
  | 'GM_setValue'
  | 'GM_getValue'
  | 'GM_setClipboard'
  | 'unsafeWindow'
  | 'window.close'
  | 'window.focus'
  | 'window.onurlchange'
  | 'GM_log'
  | 'GM_download'
  | 'GM_xmlhttpRequest'
  | 'GM_addStyle'
  | 'GM_addValueChangeListener'
  | 'GM_deleteValue'
  | 'GM_getResourceText'
  | 'GM_getResourceURL'
  | 'GM_getTab'
  | 'GM_getTabs'
  | 'GM_listValues'
  | 'GM_notification'
  | 'GM_openInTab'
  | 'GM_registerMenuCommand'
  | 'GM_removeValueChangeListener'
  | 'GM_saveTab'
  | 'GM_unregisterMenuCommand'

// https://www.tampermonkey.net/documentation.php
type TampermonkeyHeader = {
  name: string | InternationalizationStrings
  namespace?: string
  version: string
  author: string
  description: string | InternationalizationStrings
  homepage?: string
  // homepageUrl: string
  // website: string
  // source: string
  icon?: string
  // iconUrl: string
  // defaultIcon: string
  // icon64: string
  // icon64Url: string
  updateUrl?: string
  downloadUrl?: string
  supportUrl?: string
  include?: string | string[]
  match?: string | string[]
  exclude?: string | string[]
  require?: string | string[]
  resource?: string | string[]
  connect?: string | string[]
  runAt?: 'document-start' | 'document-body' | 'document-end' | 'document-idle' | 'context-menu'
  grant?: TampermonkeyGrant | TampermonkeyGrant[] | 'none'
  antiFeature?: string | string[]
  noFrames?: boolean
  unwrap?: boolean
  license?: string
}

const headers: {
  key: string
  render(banner: Banner): string | string[] | undefined
}[] = [
  {
    key: 'name',
    render: (b) => {
      if (typeof b.name === 'string') {
        return b.name
      } else {
        return b.name.en
      }
    },
  },
  {
    key: 'name:ja',
    render: (b) => {
      if (typeof b.name !== 'string') {
        return b.name.ja
      }
    },
  },
  {
    key: 'namespace',
    render: (b) => b.namespace ?? 'https://github.com/SlashNephy',
  },
  {
    key: 'version',
    render: (b) => b.version,
  },
  {
    key: 'author',
    render: (b) => b.author,
  },
  {
    key: 'description',
    render: (b) => {
      if (typeof b.description === 'string') {
        return b.description
      } else {
        return b.description.en
      }
    },
  },
  {
    key: 'description:ja',
    render: (b) => {
      if (typeof b.description !== 'string') {
        return b.description.ja
      }
    },
  },
  {
    key: 'homepage',
    render: (b) => b.homepage ?? `https://github.com/SlashNephy/.github/blob/master/env/userscript/src/${b.id}.ts`,
  },
  {
    key: 'homepageURL',
    render: (b) => b.homepage ?? `https://github.com/SlashNephy/.github/blob/master/env/userscript/src/${b.id}.ts`,
  },
  {
    key: 'icon',
    render: (b) => {
      if (b.icon !== undefined) {
        return b.icon
      }

      const url = Array.isArray(b.match) ? b.match[0] : b.match
      if (url !== undefined) {
        const domain = new URL(url).hostname
        return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
      }
    },
  },
  {
    key: 'updateURL',
    render: (b) =>
      b.updateUrl ?? `https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/${b.id}.user.js`,
  },
  {
    key: 'downloadURL',
    render: (b) =>
      b.downloadUrl ?? `https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/${b.id}.user.js`,
  },
  {
    key: 'supportURL',
    render: (b) => b.supportUrl ?? 'https://github.com/SlashNephy/.github/issues',
  },
  {
    key: 'include',
    render: (b) => b.include,
  },
  {
    key: 'match',
    render: (b) => b.match,
  },
  {
    key: 'exclude',
    render: (b) => b.exclude,
  },
  {
    key: 'require',
    render: (b) => b.require,
  },
  {
    key: 'resource',
    render: (b) => b.resource,
  },
  {
    key: 'connect',
    render: (b) => b.connect,
  },
  {
    key: 'run-at',
    render: (b) => b.runAt,
  },
  {
    key: 'grant',
    render: (b) => b.grant ?? 'none',
  },
  {
    key: 'antifeature',
    render: (b) => b.antiFeature,
  },
  {
    key: 'noframes',
    render: (b) => {
      if (b.noFrames === true) {
        return ''
      }
    },
  },
  {
    key: 'unwrap',
    render: (b) => {
      if (b.unwrap === true) {
        return ''
      }
    },
  },
  {
    key: 'license',
    render: (b) => b.license ?? 'MIT license',
  },
]

const buildBanner = (banner: Banner): string => {
  const evaluated = headers
    .map((header) => ({
      key: header.key,
      value: header.render(banner),
    }))
    .filter((x) => x.value !== undefined)

  const maxKeyLength = Math.max(...evaluated.map((h) => h.key.length))
  const lines = [
    '// ==UserScript==',
    ...evaluated
      .map(({ key, value }) => {
        const label = `// @${key}${' '.repeat(maxKeyLength - key.length)}  `

        if (Array.isArray(value)) {
          return value.map((v) => `${label}${v}`.trimEnd()).join('\n')
        }
        if (value !== undefined) {
          return `${label}${value}`.trimEnd()
        }

        return null
      })
      .filter((x): x is Exclude<typeof x, null> => x !== null),
    '// ==/UserScript==',
    '',
  ]

  return lines.join('\n')
}
