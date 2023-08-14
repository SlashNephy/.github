import { writeFile } from 'fs/promises'
import { join } from 'path'

import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

import type { RollupOptions } from 'rollup'

type RenderMode = 'dist' | 'dev-chrome' | 'dev-firefox'

export const buildOptions = (banner: Banner): RollupOptions => {
  createDevScript(banner).catch(console.error)

  return {
    ...banner.options,
    input: banner.private === true ? join('src', 'private', `${banner.id}.ts`) : join('src', `${banner.id}.ts`),
    output: {
      ...banner.options?.output,
      banner: renderBanner(banner, 'dist'),
      format: 'iife',
      file:
        banner.private === true
          ? join('dist', 'private', `${banner.id}.user.js`)
          : join('dist', `${banner.id}.user.js`),
    },
    plugins: [
      nodeResolve({
        browser: true,
      }),
      commonjs(),
      typescript(),
      babel({
        babelHelpers: 'bundled',
      }),
    ],
  }
}

const createDevScript = async (banner: Banner) => {
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const promises = (['dev-chrome', 'dev-firefox'] as RenderMode[]).map((mode) => {
    const filename = `${banner.id}.${mode}.user.js`
    const path = banner.private === true ? join('dist', 'private', filename) : join('dist', filename)

    return writeFile(path, renderBanner(banner, mode))
  })
  await Promise.all(promises)
}

export type Banner = BuildConfig & TampermonkeyHeader

type BuildConfig = {
  id: string
  private?: boolean
  options?: Omit<RollupOptions, 'input' | 'plugins'>
}

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

type TampermonkeyAntiFeature = 'ads' | 'membership' | 'miner' | 'payment' | 'referral-link' | 'tracking'

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
  antiFeature?: TampermonkeyAntiFeature | TampermonkeyAntiFeature[]
  noFrames?: boolean
  unwrap?: boolean
  license?: string
}

const headers: {
  key: string
  render(banner: Banner, mode: RenderMode): string | string[] | undefined
}[] = [
  {
    key: 'name',
    render: (b, mode) => {
      if (typeof b.name === 'string') {
        return `${mode !== 'dist' ? '[Dev] ' : ''}${b.name}`
      }
      return `${mode !== 'dist' ? '[Dev] ' : ''}${b.name.en}`
    },
  },
  {
    key: 'name:ja',
    render: (b, mode) => {
      if (typeof b.name !== 'string') {
        return `${mode !== 'dist' ? '[Dev] ' : ''}${b.name.ja}`
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
      }
      return b.description.en
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
    render: (b) => {
      if (b.private === true) {
        return
      }

      return b.homepage ?? `https://github.com/SlashNephy/.github/blob/master/env/userscript/src/${b.id}.ts`
    },
  },
  {
    key: 'homepageURL',
    render: (b) => {
      if (b.private === true) {
        return
      }

      return b.homepage ?? `https://github.com/SlashNephy/.github/blob/master/env/userscript/src/${b.id}.ts`
    },
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
    render: (b, mode) => {
      switch (mode) {
        case 'dist':
          return b.updateUrl ?? `https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/${b.id}.user.js`
        case 'dev-chrome':
          return b.private === true
            ? `file://${join(process.cwd(), 'dist', 'private', `${b.id}.dev.user.js`)}`
            : `file://${join(process.cwd(), 'dist', `${b.id}.dev.user.js`)}`
        case 'dev-firefox':
          return b.private === true
            ? `http://localhost:3000/private/${b.id}.dev.user.js`
            : `http://localhost:3000/${b.id}.dev.user.js`
      }
    },
  },
  {
    key: 'downloadURL',
    render: (b, mode) => {
      switch (mode) {
        case 'dist':
          return b.downloadUrl ?? `https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/${b.id}.user.js`
        case 'dev-chrome':
          return b.private === true
            ? `file://${join(process.cwd(), 'dist', 'private', `${b.id}.dev.user.js`)}`
            : `file://${join(process.cwd(), 'dist', `${b.id}.dev.user.js`)}`
        case 'dev-firefox':
          return b.private === true
            ? `http://localhost:3000/private/${b.id}.dev.user.js`
            : `http://localhost:3000/${b.id}.dev.user.js`
      }
    },
  },
  {
    key: 'supportURL',
    render: (b) => {
      if (b.private === true) {
        return
      }

      return b.supportUrl ?? 'https://github.com/SlashNephy/.github/issues'
    },
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
    render: (b, mode) => {
      switch (mode) {
        case 'dist':
          return b.require
        case 'dev-chrome': {
          const require = b.require ?? []
          const path =
            b.private === true
              ? `file://${join(process.cwd(), 'dist', 'private', `${b.id}.user.js`)}`
              : `file://${join(process.cwd(), 'dist', `${b.id}.user.js`)}`
          if (typeof require === 'string') {
            return [path]
          }
          return [...require, path]
        }
        case 'dev-firefox': {
          const require = b.require ?? []
          const path =
            b.private === true
              ? `http://localhost:3000/private/${b.id}.user.js`
              : `http://localhost:3000/${b.id}.user.js`
          if (typeof require === 'string') {
            return [path]
          }
          return [...require, path]
        }
      }
    },
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
    render: (b) => {
      if (b.private === true) {
        return
      }

      return b.license ?? 'MIT license'
    },
  },
]

const renderBanner = (banner: Banner, mode: RenderMode): string => {
  const evaluated = headers
    .map((header) => ({
      key: header.key,
      value: header.render(banner, mode),
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
