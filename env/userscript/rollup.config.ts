import { buildOptions } from './lib/tampermonkey/build'

import type { Banner } from './lib/tampermonkey/build'
import type { RollupOptions } from 'rollup'

export const banners: Banner[] = [
  {
    id: 'annict-work-links',
    name: 'Annict Work Links',
    version: '0.3.2',
    description: {
      en: 'Add links to "Shoboi Calendar", "MyAnimeList" and "AniList" on Annict works page.',
      ja: 'Annict の作品ページに「しょぼいカレンダー」「MyAnimeList」「AniList」へのリンクを追加します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/Annict_%E3%81%AE%E4%BD%9C%E5%93%81%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E5%90%84%E7%A8%AE%E3%82%B5%E3%82%A4%E3%83%88%E3%81%B8%E3%81%AE%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://annict.com/*'],
    connect: ['raw.githubusercontent.com'],
    grant: 'GM_xmlhttpRequest',
  },
  {
    id: 'dominion-online-auto-table-setter',
    name: 'dominion.games Auto Table Setter',
    version: '0.4.0',
    description: {
      en: 'Automatically configures the table settings in dominion.games.',
      ja: 'dominion.games の卓設定を自動的に設定します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/Dominion_Online_%E3%81%AE%E5%8D%93%E3%82%92%E8%87%AA%E5%8B%95%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://dominion.games/'],
  },
  {
    id: 'ff14angler-bypass-adblock-check',
    name: 'FF14Angler Bypass AdBlocker Check',
    version: '0.2.3',
    description: {
      en: 'Disable AdBlocker check in FF14Angler.',
      ja: 'FF14Angler の AdBlocker チェックを無効にします。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/%E7%8C%AB%E3%81%AF%E3%81%8A%E8%85%B9%E3%81%8C%E3%81%99%E3%81%84%E3%81%9F%E3%81%AE%E5%BA%83%E5%91%8A%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E6%A4%9C%E7%9F%A5%E3%82%92%E5%9B%9E%E9%81%BF%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://*.ff14angler.com/*'],
    runAt: 'document-body',
    icon: 'https://www.google.com/s2/favicons?sz=64&domain=jp.ff14angler.com',
  },
  {
    id: 'feedly-auto-refresh',
    name: 'Feedly Auto Refresh',
    version: '0.2.3',
    description: {
      en: 'Auto refresh feeds when there are no unread articles in Feedly.',
      ja: 'Feedly で未読記事がないとき、フィードを自動リフレッシュします。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/Feedly_%E3%81%A7%E6%9C%AA%E8%AA%AD%E8%A8%98%E4%BA%8B%E3%81%8C%E3%81%AA%E3%81%84%E3%81%A8%E3%81%8D%E3%80%81%E3%83%95%E3%82%A3%E3%83%BC%E3%83%89%E3%82%92%E8%87%AA%E5%8B%95%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://feedly.com/i/collection/*'],
  },
  {
    id: 'amq-preload-video',
    name: 'AMQ Preload Video',
    version: '0.3.0',
    description: {
      en: 'Just enable media preloading. Buffering may be faster.',
      ja: 'プレイヤーのプリロードを有効にします。バッファリングが速くなるかもしれません。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E3%83%A1%E3%83%87%E3%82%A3%E3%82%A2%E3%82%92%E3%83%97%E3%83%AA%E3%83%AD%E3%83%BC%E3%83%89%E3%81%95%E3%81%9B%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    grant: 'unsafeWindow',
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'amq-result-exporter',
    name: 'AMQ Result Exporter',
    version: '0.5.1',
    description: {
      en: 'Export song results to your Google Spreadsheet!',
      ja: 'Google スプレッドシートに AMQ のリザルト (正誤、タイトル、難易度...) を送信します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E3%83%AA%E3%82%B6%E3%83%AB%E3%83%88%E3%82%92_Google_%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E3%82%B7%E3%83%BC%E3%83%88%E3%81%AB%E9%80%81%E4%BF%A1%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    connect: ['script.google.com', 'raw.githubusercontent.com'],
    grant: ['GM_xmlhttpRequest', 'GM_getValue', 'GM_setValue', 'unsafeWindow'],
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'google-remove-redirection-warning',
    name: 'Google Remove Redirection Warning',
    version: '0.1.3',
    description: {
      en: 'Remove redirection warning from https://google.com/url',
      ja: 'https://google.com/url のリダイレクト警告をスキップします。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/Google_%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%88%E3%82%B7%E3%83%BC%E3%83%88%E5%86%85%E3%81%AE%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%92%E8%B8%8F%E3%82%93%E3%81%A0%E9%9A%9B%E3%81%AE%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%83%88%E8%AD%A6%E5%91%8A%E3%82%92%E3%82%B9%E3%82%AD%E3%83%83%E3%83%97%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://google.com/url?q=*', 'https://www.google.com/url?q=*'],
  },
  {
    id: 'annict-hide-future-programs',
    name: 'Annict Hide Future Programs',
    version: '0.1.6',
    description: {
      en: 'Hide programs for the next day or later in Annict track page. In addition, it hides works that have no unwatched episodes.',
      ja: 'Annict の「記録するページ」で翌日以降の番組を非表示にします。さらに未視聴エピソードがない作品を非表示にします。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/Annict_%E3%81%AE%E8%A8%98%E9%8C%B2%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%A7%E6%9C%AA%E6%9D%A5%E3%81%AE%E6%94%BE%E9%80%81%E4%BA%88%E5%AE%9A%E3%82%92%E9%9D%9E%E8%A1%A8%E7%A4%BA%E3%81%AB%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://annict.com/*'],
  },
  {
    id: 'amq-private-session',
    name: 'AMQ Private Session',
    version: '0.3.0',
    description: {
      en: 'Set invisible status automatically on login.',
      ja: 'ログイン時に Invisible ステータスを設定します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E7%8A%B6%E6%B3%81%E3%82%92%E9%9A%A0%E3%81%99_UserScript',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    grant: 'unsafeWindow',
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'amq-detailed-song-info',
    name: 'AMQ Detailed Song Info',
    version: '0.7.1',
    description: {
      en: 'Display detailed information on the side panel of the song.',
      ja: '曲のサイドパネルに詳細な情報を表示します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E6%9B%B2%E3%81%AE%E3%82%B5%E3%82%A4%E3%83%89%E3%83%91%E3%83%8D%E3%83%AB%E3%81%AB%E8%A9%B3%E7%B4%B0%E6%83%85%E5%A0%B1%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    connect: ['api.jikan.moe', 'api.myanimelist.net'],
    grant: ['unsafeWindow', 'GM_xmlhttpRequest', 'GM_getValue', 'GM_setValue'],
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'amq-hide-annoying-dialog',
    name: 'AMQ Hide Annoying Dialog',
    version: '0.2.0',
    description: {
      en: 'Hide annoying message dialogs when disconnecting and reconnecting.',
      ja: 'コネクションの切断や再接続時の邪魔なメッセージダイアログを非表示にします。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E9%82%AA%E9%AD%94%E3%81%AA%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E3%83%80%E3%82%A4%E3%82%A2%E3%83%AD%E3%82%B0%E3%82%92%E9%9D%9E%E8%A1%A8%E7%A4%BA%E3%81%AB%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    grant: 'unsafeWindow',
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'amq-readable-watching-status',
    name: 'AMQ Readable Watching Status',
    version: '0.2.0',
    description: {
      en: 'Narrow the width of the answered anime titles to make the watching status indicator readable.',
      ja: '解答欄の幅を狭め、視聴状況のインジケーターを読みやすくします。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E9%82%AA%E9%AD%94%E3%81%AA%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E3%83%80%E3%82%A4%E3%82%A2%E3%83%AD%E3%82%B0%E3%82%92%E9%9D%9E%E8%A1%A8%E7%A4%BA%E3%81%AB%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    grant: 'unsafeWindow',
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'amq-clear-answer',
    name: 'AMQ Clear Answer',
    version: '1.1.0',
    description: {
      en: 'Add a feature to clear text in the answer column with Delete key.',
      ja: 'Delete キーを押下することで解答欄のテキストをクリアする機能を追加します。',
    },
    homepage: '',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    grant: 'unsafeWindow',
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'amq-song-guess-rate',
    name: 'AMQ Song Guess Rate',
    version: '0.3.1',
    description: {
      en: 'Display guess rates per song in side panel of the song. (Requires AMQ Detailed Song Info plugin: version 0.3.0 or higher)',
      ja: '曲のサイドパネルに曲ごとの正答率を表示します。(0.3.0 以降の AMQ Detailed Song Info プラグインが必要です。)',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E6%9B%B2%E3%81%94%E3%81%A8%E3%81%AE%E6%AD%A3%E7%AD%94%E7%8E%87%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    grant: ['GM_getValue', 'GM_setValue', 'unsafeWindow', 'GM_deleteValue', 'GM_listValues'],
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'amq-sanime-link',
    name: 'AMQ sanime Link',
    version: '0.2.0',
    description: {
      en: 'Display links to sanime and "i(lyl)2m" in the player list.',
      ja: 'プレイヤーリストに sanime や "i(lyl)2m" へのリンクを表示します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AMQ_%E3%81%A7_sanime_%E3%82%84_i(lyl)2m_%E3%81%B8%E3%81%AE%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    grant: 'unsafeWindow',
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'amq-display-answer-time-2',
    name: 'AMQ Display Answer Time 2',
    version: '0.3.0',
    description: {
      en: 'Display player answer time in seconds.',
      ja: 'プレイヤーの解答時間を秒単位で表示します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E8%A7%A3%E7%AD%94%E6%99%82%E9%96%93%E3%82%92%E7%A7%92%E5%8D%98%E4%BD%8D%E3%81%A7%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    grant: 'unsafeWindow',
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'amq-auto-continue-login',
    name: 'AMQ Auto Continue Login',
    version: '0.2.0',
    description: {
      en: 'Press the Continue Login button automatically in Login Page.',
      ja: 'ログインページの「Continue Login」ボタンを自動で押下します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E8%87%AA%E5%8B%95%E3%81%A7_Continue_Login_%E3%83%9C%E3%82%BF%E3%83%B3%E3%82%92%E6%8A%BC%E3%81%99_UserScript',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com', 'https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    grant: 'unsafeWindow',
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'akashi-show-remaining-hours',
    name: 'AKASHI Show Remaining Hours',
    version: '0.1.0',
    description: {
      en: 'Display the remaining required working hours in attendance page.',
      ja: '出勤簿ページに残り必要な労働時間を表示します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AKASHI_%E3%81%AE%E6%AE%8B%E3%82%8A%E5%BF%85%E8%A6%81%E5%8A%B4%E5%83%8D%E6%99%82%E9%96%93%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://atnd.ak4.jp/attendance'],
  },
  {
    id: 'amq-dynamic-background',
    name: 'AMQ Dynamic Background',
    version: '0.3.0',
    description: {
      en: 'Set the currently playing video surface as the background image.',
      ja: '現在再生中の動画を背景画像に設定します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E8%83%8C%E6%99%AF%E3%81%AB%E5%8B%95%E7%94%BB%E3%82%92%E6%B5%81%E3%81%99_UserScript',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    grant: 'unsafeWindow',
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'annict-following-viewings',
    name: 'Annict Following Viewings',
    version: '0.3.2',
    description: {
      en: 'Display following viewings on Annict work page.',
      ja: 'Annictの作品ページにフォロー中のユーザーの視聴状況を表示します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/Annict_%E3%81%AE%E4%BD%9C%E5%93%81%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E3%83%95%E3%82%A9%E3%83%AD%E3%83%BC%E4%B8%AD%E3%81%AE%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AE%E8%A6%96%E8%81%B4%E7%8A%B6%E6%B3%81%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://annict.com/*'],
    connect: ['api.annict.com', 'raw.githubusercontent.com', 'graphql.anilist.co'],
    grant: ['GM_xmlhttpRequest', 'GM_getValue', 'GM_setValue', 'GM_deleteValue'],
    require: [
      'https://cdn.jsdelivr.net/gh/sizzlemctwizzle/GM_config@2207c5c1322ebb56e401f03c2e581719f909762a/gm_config.js',
    ],
  },
  {
    id: 'anilist-status-filter',
    name: 'AniList Status Filter',
    version: '0.1.1',
    description: {
      en: 'Filter anime by your status on AniList search page.',
      ja: 'AniListの作品検索ページ内で自分の視聴ステータスでフィルターできるようにします。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AniList_%E3%81%A7%E8%87%AA%E5%88%86%E3%81%AE%E8%A6%96%E8%81%B4%E3%82%B9%E3%83%86%E3%83%BC%E3%82%BF%E3%82%B9%E3%81%AB%E5%BF%9C%E3%81%98%E3%81%A6%E4%BD%9C%E5%93%81%E3%82%92%E3%83%95%E3%82%A3%E3%83%AB%E3%82%BF%E3%83%BC%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://anilist.co/*'],
  },
  {
    id: 'amq-i18n-titles',
    name: 'AMQ i18n Titles',
    version: '0.1.2',
    description: {
      en: 'Display localized anime titles. (Currently support only Japanese.)',
      ja: '選択肢やドロップダウンに表示されているアニメのタイトルを日本語に置換します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AMQ_%E3%81%A7%E3%82%A2%E3%83%8B%E3%83%A1%E3%81%AE%E3%82%BF%E3%82%A4%E3%83%88%E3%83%AB%E3%82%92%E3%83%AD%E3%83%BC%E3%82%AB%E3%83%A9%E3%82%A4%E3%82%BA%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: ['https://animemusicquiz.com/*'],
    icon: 'https://animemusicquiz.com/favicon-32x32.png',
    grant: ['unsafeWindow', 'GM_xmlhttpRequest'],
    connect: ['raw.githubusercontent.com'],
    require: [
      'https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js',
    ],
  },
  {
    id: 'detect-types',
    name: 'Detect Types',
    version: '0.1.0',
    description: {
      en: 'Register a function to generate runtime window type definitions.',
      ja: 'window の型定義を生成する関数を登録します。',
    },
    homepage: 'https://scrapbox.io/slashnephy',
    author: 'SlashNephy',
    match: 'https://*/*',
    grant: 'unsafeWindow',
  },
  {
    id: 'anime-comment-overlay',
    name: 'Anime Comment Overlay',
    version: '0.4.0',
    description: {
      en: 'Display overlay of comments on various streaming sites and EPGStation.',
      ja: 'アニメ配信サイト (dアニメストア / ABEMAビデオ / Netflix) や EPGStation で実況コメをオーバーレイ表示します。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/%E3%82%A2%E3%83%8B%E3%83%A1%E9%85%8D%E4%BF%A1%E3%82%B5%E3%82%A4%E3%83%88%E3%81%A7%E5%AE%9F%E6%B3%81%E3%82%B3%E3%83%A1%E3%82%92%E3%82%AA%E3%83%BC%E3%83%90%E3%83%BC%E3%83%AC%E3%82%A4%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: [
      'https://animestore.docomo.ne.jp/animestore/sc_d_pc?partId=*',
      'https://abema.tv/video/episode/*',
      'https://www.netflix.com/watch/*',
      '*://*/*',
    ],
    require: [
      'https://cdn.jsdelivr.net/npm/@xpadev-net/niconicomments@0.2.54/dist/bundle.min.js',
      'https://cdn.jsdelivr.net/gh/NaturalIntelligence/fast-xml-parser@ecf6016f9b48aec1a921e673158be0773d07283e/lib/fxp.min.js',
    ],
    connect: ['cal.syoboi.jp'],
    grant: 'GM_xmlhttpRequest',
    options: {
      external: ['@xpadev-net/niconicomments', 'fast-xml-parser'],
      output: {
        globals: {
          '@xpadev-net/niconicomments': 'NiconiComments',
          'fast-xml-parser': 'fxp',
        },
      },
    },
  },
  {
    id: 'auto-close-aws-vpn-client-window',
    name: 'Auto-Close AWS VPN Client Window',
    version: '0.1.0',
    description: {
      en: 'Close the AWS VPN Client window automatically.',
      ja: '認証後に AWS VPN Client のウィンドウを自動的に閉じます。',
    },
    homepage:
      'https://scrapbox.io/slashnephy/AWS_VPN_Client_%E3%81%AE%E8%AA%8D%E8%A8%BC%E7%94%BB%E9%9D%A2%E3%82%92%E8%87%AA%E5%8B%95%E7%9A%84%E3%81%AB%E9%96%89%E3%81%98%E3%82%8B_UserScript',
    author: 'SlashNephy',
    match: 'http://127.0.0.1:35001/',
  },
]

const config: RollupOptions[] = banners.map((banner) => buildOptions(banner))
export default config
