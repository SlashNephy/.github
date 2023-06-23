import type { NiconicoJikkyoChannel } from '../../lib/external/tsukumijima'

// Annict でサポートされている動画サービスのチャンネル ID
// https://annict.com/db/channels
export const AnnictSupportedVodChannelIds = {
  // バンダイチャンネル
  bandai: 107,
  // ニコニコチャンネル
  niconico: 165,
  // dアニメストア
  dAnime: 241,
  // Amazon プライム・ビデオ
  amazonPrimeVideo: 243,
  // Netflix
  netflix: 244,
  // ABEMAビデオ
  abemaVideo: 260,
  // dアニメストア ニコニコ支店
  dAnimeNiconico: 306,
}

// チャンネルの CM 構成
// CM が存在しないチャンネルでは null を設定する
export const ChannelCmAttributes: Record<
  NiconicoJikkyoChannel,
  {
    // 先頭の CM の長さ (秒)
    // TODO: 条件分岐してこのパラメーターを変更できるように
    head: number
    // 「提供」でのスポンサー読み上げ部分の長さ (秒)
    sponsor: number
    // 通常の CM の長さ (秒)
    normal: number
  } | null
> = {
  // NHK 総合
  jk1: null,
  // NHK Eテレ
  jk2: null,
  // 日テレ
  jk4: {
    head: 60,
    sponsor: 5,
    normal: 150,
  },
  // テレビ朝日
  jk5: {
    head: 60 + 3, // ヌマニメーション
    sponsor: 5,
    normal: 105,
  },
  // TBS
  jk6: {
    head: 0,
    sponsor: 10,
    normal: 135,
  },
  // テレビ東京
  jk7: {
    head: 0, // 枠によって 30 の場合もある...
    sponsor: 10,
    normal: 60,
  },
  // フジテレビ
  jk8: {
    head: 120,
    sponsor: 10,
    normal: 90,
  },
  // TOKYO MX
  jk9: {
    head: 0,
    sponsor: 10,
    normal: 60,
  },
  // テレ玉
  jk10: {
    head: 0,
    sponsor: 10,
    normal: 60,
  },
  // tvk
  jk11: {
    head: 0,
    sponsor: 10,
    normal: 60,
  },
  // チバテレビ
  jk12: {
    head: 0,
    sponsor: 10,
    normal: 60,
  },
  // NHK BS1
  jk101: null,
  // NHK BSプレミアム
  jk103: null,
  // BS日テレ
  jk141: {
    head: 15,
    sponsor: 10,
    normal: 60,
  },
  // BS朝日
  jk151: {
    head: 0,
    sponsor: 10,
    normal: 60,
  },
  // BS-TBS
  jk161: {
    head: 3, // アニメイズム
    sponsor: 10,
    normal: 60,
  },
  // BSテレ東
  jk171: {
    head: 0,
    sponsor: 10,
    normal: 60,
  },
  // BSフジ
  jk181: {
    head: 15, // アニメギルド
    sponsor: 5,
    normal: 135,
  },
  // WOWOW
  jk191: null,
  jk192: null,
  jk193: null,
  // BS11
  jk211: {
    head: 0,
    sponsor: 10,
    normal: 60,
  },
  // BS12
  jk222: {
    head: 10, // アニメ26
    sponsor: 10,
    normal: 150,
  },
  // BSアニマックス
  jk236: {
    head: 10,
    sponsor: 10,
    normal: 45,
  },
  // WOWOWプラス
  jk252: null,
  // BS松竹東急
  jk260: {
    head: 2,
    sponsor: 10,
    normal: 120,
  },
  // BSJapanext
  jk263: {
    head: 0,
    sponsor: 10,
    normal: 180,
  },
  // BSよしもと
  jk265: {
    head: 10,
    sponsor: 10,
    normal: 60,
  },
  // AT-X
  jk333: null,
}

// TV 放送のラグによるずれを補正する値 (1/100秒)
export const vposAdjustment = 50

// 実況民が書き込む本編のパートの記号
export const partSymbols = ['A', 'B', 'C']

// 上記のコメントを本編のパートと見做す最小のコメント数 (> 0)
export const partSymbolCommentsThreshold = 2

// CM パート明けの実況民のコメントのずれを補正する値 (秒)
export const partSymbolAdjustment = 3

// OP パートを特定するための記号
export const opSymbols = ['OP']

// 上記のコメントを OP パートと見做す最小のコメント数 (> 0)
export const opSymbolCommentsThreshold = 2

// OP パートの長さ (秒)
export const opLength = 90

// OP パートが終わってから以下の時間までの間には CM がないものと見做す値 (秒)
export const opAdjustment = 30

// dアニメストアのコピーライトホルダーの映像の長さ (秒)
// dアニメストアの一部の配信作品では、先頭にコピーライトホルダーの映像が挿入されることがある
// コメントのずれを補正するために以下に定義する
export const copyrightCmAttributes: {
  pattern: RegExp
  adjustment: number
}[] = [
  {
    // BNPictures
    pattern: /^&copy;BNP\//,
    adjustment: 3,
  },
]

// 最大の参照される番組数
// 古い方から n 件使用する
export const maxPrograms = 5

// コメント描画のフレームレート
export const targetFps = 100
