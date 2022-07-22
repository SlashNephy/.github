import { buildOptions } from './lib/tampermonkey'

import type { RollupOptions } from 'rollup'

const config: RollupOptions[] = [
  buildOptions('annict-work-links', {
    name: 'Annict Work Links',
    namespace: 'https://annict.com/',
    version: '0.2.0',
    description: 'しょぼいカレンダー、MyAnimeList、AniList に対応しています。',
    author: 'SlashNephy <spica@starry.blue>',
    match: 'https://annict.com/works/*',
    connect: 'raw.githubusercontent.com',
    grant: 'GM_xmlhttpRequest',
  }),
  buildOptions('dominion-online-auto-table-setter', {
    name: 'dominion.games Auto Table Setter',
    namespace: 'https://dominion.games/',
    version: '0.3.0',
    description: 'dominion.games の卓設定を自動的に設定します。',
    author: 'SlashNephy <spica@starry.blue>',
    match: 'https://dominion.games/',
  }),
  buildOptions('ff14angler-bypass-adblock-check', {
    name: 'FF14Angler Bypass AdBlock Check',
    namespace: 'https://ff14angler.com/',
    version: '0.2.0',
    description: 'FF14Angler の AdBlock チェックを無効にします。',
    author: 'SlashNephy <spica@starry.blue>',
    match: 'https://*.ff14angler.com/*',
    runAt: 'document-body',
  }),
  buildOptions('feedly-auto-refresh', {
    name: 'Feedly Auto Refresh',
    namespace: 'https://feedly.com/',
    version: '0.2.0',
    description: 'Feedly で未読記事がないとき、フィードを自動リフレッシュします。',
    author: 'SlashNephy <spica@starry.blue>',
    match: 'https://feedly.com/i/collection/*',
  }),
]

export default config
