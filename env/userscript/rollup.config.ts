import { buildOptions } from './lib/tampermonkey'

import type { RollupOptions } from 'rollup'

const config: RollupOptions[] = [
  buildOptions({
    id: 'annict-work-links',
    name: 'Annict Work Links',
    version: '0.2.0',
    description: 'しょぼいカレンダー、MyAnimeList、AniList に対応しています。',
    author: 'SlashNephy <spica@starry.blue>',
    match: 'https://annict.com/works/*',
    connect: 'raw.githubusercontent.com',
    grant: 'GM_xmlhttpRequest',
  }),
  buildOptions({
    id: 'dominion-online-auto-table-setter',
    name: 'dominion.games Auto Table Setter',
    version: '0.3.0',
    description: 'dominion.games の卓設定を自動的に設定します。',
    author: 'SlashNephy <spica@starry.blue>',
    match: 'https://dominion.games/',
  }),
  buildOptions({
    id: 'ff14angler-bypass-adblock-check',
    name: 'FF14Angler Bypass AdBlock Check',
    version: '0.2.0',
    description: 'FF14Angler の AdBlock チェックを無効にします。',
    author: 'SlashNephy <spica@starry.blue>',
    match: 'https://*.ff14angler.com/*',
    runAt: 'document-body',
  }),
  buildOptions({
    id: 'feedly-auto-refresh',
    name: 'Feedly Auto Refresh',
    version: '0.2.0',
    description: 'Feedly で未読記事がないとき、フィードを自動リフレッシュします。',
    author: 'SlashNephy <spica@starry.blue>',
    match: 'https://feedly.com/i/collection/*',
  }),
  buildOptions({
    id: 'amq-preload-video',
    name: 'AMQ Preload Video',
    version: '0.1.0',
    description: 'Just enable media preloading. Speed up buffering.',
    author: 'SlashNephy <spica@starry.blue>',
    match: 'https://animemusicquiz.com/',
    requires: ['https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqScriptInfo.js'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
  }),
]

export default config
