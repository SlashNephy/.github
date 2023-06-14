import { findKanjiNumbers, kanji2number } from '@geolonia/japanese-numeral'
import NiconiComments from '@xpadev-net/niconicomments'
import { hasMinLength } from 'ts-array-length'

import { awaitFor } from '../lib/awaitFor'
import { fetchArmEntries } from '../lib/external/arm'
import { fetchAnnictBroadcastData } from '../lib/external/collect-vod-data'
import { fetchSayaDefinitions } from '../lib/external/saya'
import { fetchSyobocalProgLookup } from '../lib/external/syobocal'
import { fetchNiconicoJikkyoKakoLog } from '../lib/external/tsukumijima'

import type { SayaDefinitions } from '../lib/external/saya'
import type {
  NiconicoJikkyoChannel,
  NiconicoJikkyoKakoLogRequest,
  NiconicoJikkyoKakoLogResponse,
} from '../lib/external/tsukumijima'
import type { ApiChat, RawApiResponse } from '@xpadev-net/niconicomments'

type Containers = {
  video: HTMLVideoElement
  canvas: HTMLCanvasElement
  toggleButton?: HTMLElement
}

type Episode = {
  site: 'danime'
  workIds: number[]
  workSiteId: string
  workTitle: string
  episodeSiteId: string
  episodeNumberRaw?: string
  episodeNumber?: number
  episodeTitle?: string
}

type CommentOverlayModuleEventMap = {
  episodeChanged(): void
}

type CommentOverlayModule = {
  name: string
  url: RegExp
  initializeContainers(): Containers
  detectEpisode(...params: string[]): Promise<Episode>
  addEventListener<K extends keyof CommentOverlayModuleEventMap>(
    event: K,
    callback: CommentOverlayModuleEventMap[K]
  ): void
  removeEventListener<K extends keyof CommentOverlayModuleEventMap>(
    event: K,
    callback: CommentOverlayModuleEventMap[K]
  ): void
}

function extractEpisodeNumber(text: string): number | undefined {
  // TODO: ローマ数字対応
  // アラビア数字 → number
  const match = /\d+/.exec(text)
  if (match && hasMinLength(match, 1)) {
    return parseInt(match[0], 10)
  }

  // 漢数字 → number
  const kanjis = findKanjiNumbers(text)
  if (hasMinLength(kanjis, 1)) {
    return kanji2number(kanjis[0])
  }
}

const modules: CommentOverlayModule[] = [
  {
    name: 'dアニメストア',
    url: /^https:\/\/animestore\.docomo\.ne\.jp\/animestore\/sc_d_pc\?partId=(\d+)$/,
    initializeContainers(): Containers {
      const video = document.querySelector<HTMLVideoElement>('video#video')
      if (video === null) {
        throw new Error('video container not found')
      }

      const canvas = document.createElement('canvas')
      canvas.width = 1920
      canvas.height = 1080
      canvas.style.position = 'relative'
      canvas.style.objectFit = 'contain'
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      canvas.style.zIndex = '10'
      video.insertAdjacentElement('afterend', canvas)

      const toggleButton = document.createElement('div')
      toggleButton.classList.add('mainButton')
      const innerButton = document.createElement('button')
      innerButton.classList.add('fullscreenButton')
      toggleButton.appendChild(innerButton)
      document.querySelector('.buttonArea .time')?.insertAdjacentElement('afterend', toggleButton)

      return { video, canvas, toggleButton }
    },
    async detectEpisode(partId: string): Promise<Episode> {
      const [backInfoTxt1, backInfoTxt2, backInfoTxt3] = [$('.backInfoTxt1'), $('.backInfoTxt2'), $('.backInfoTxt3')]
      await awaitFor(
        () => backInfoTxt1.text().length > 0 && backInfoTxt2.text().length > 0 && backInfoTxt3.text().length > 0
      )

      const workSiteId = partId.slice(0, 5)
      const data = await fetchAnnictBroadcastData()

      return {
        site: 'danime',
        workIds: data
          .filter((x) => x.channel_id === annictSupportedVodChannelIds.dAnime && x.vod_code === workSiteId)
          .map((x) => x.work_id),
        workSiteId,
        workTitle: backInfoTxt1.text(),
        episodeSiteId: partId,
        episodeNumberRaw: backInfoTxt2.text(),
        episodeNumber: extractEpisodeNumber(backInfoTxt2.text()),
        episodeTitle: backInfoTxt3.text(),
      }
    },
    addEventListener<K extends keyof CommentOverlayModuleEventMap>(
      event: K,
      callback: CommentOverlayModuleEventMap[K]
    ): void {
      switch (event) {
        case 'episodeChanged':
          $('.backInfoTxt3').on('DOMSubtreeModified propertychange', callback)
      }
    },
    removeEventListener<K extends keyof CommentOverlayModuleEventMap>(
      event: K,
      callback: CommentOverlayModuleEventMap[K]
    ): void {
      switch (event) {
        case 'episodeChanged':
          $('.backInfoTxt3').off('DOMSubtreeModified propertychange', callback)
      }
    },
  },
  // {
  //   name: 'ABEMAビデオ',
  //   url: /^https:\/\/abema\.tv\/video\/episode\/(.+)$/,
  // },
]

// Annict でサポートされている動画サービスのチャンネル ID
// https://annict.com/db/channels
const annictSupportedVodChannelIds = {
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

type CmLengthMap = Partial<Record<NiconicoJikkyoChannel, number>>

// TV 放送における CM の長さ (秒)
const cmLengthMap: CmLengthMap = {
  // TOKYO MX
  jk9: 60,
  // BS11
  jk211: 60,
}
// TV 放送における先頭の CM の長さ (秒)
const headCmLengthMap: CmLengthMap = {
  // フジテレビ
  jk8: 120,
}

// 「提供」の長さ (秒)
// 最初の CM パートにのみ加算
const additionalCmLength = 10
// TV 放送のラグによるずれを補正する値 (1/100秒)
const vposAdjustment = 50
// 実況民が書き込む本編のパートの記号
const partSymbols = ['A', 'B', 'C']
// 上記のコメントを本編のパートと見做す最小のコメント数 (> 0)
const partSymbolThreshold = 2
// CM パート明けの実況民のコメントのずれを補正する値 (秒)
const partSymbolAdjustment = 3

function parseNiconicoJikkyoKakoLogResponse(
  request: NiconicoJikkyoKakoLogRequest,
  response: NiconicoJikkyoKakoLogResponse
): RawApiResponse[] {
  if ('error' in response) {
    console.error(`[anime-comment-overlay] received error from niconico jikkyo kako log: ${response.error}`)
    return []
  }

  const chats = response.packet
    // 削除済みコメント/あぼん除去
    .filter(({ chat }) => chat.deleted !== '1' && chat.abone !== '1')
    // 過去ログ API の型を変換
    .map(
      ({ chat }) =>
        ({
          chat: {
            thread: chat.thread,
            no: parseInt(chat.no, 10),
            // 後で計算するので一旦適当に埋めておく
            vpos: 0,
            date: parseInt(chat.date, 10),
            date_usec: parseInt(chat.date_usec, 10),
            nicoru: chat.nicoru ? parseInt(chat.nicoru, 10) : 0,
            premium: chat.premium ? parseInt(chat.premium, 10) : 0,
            anonymity: chat.anonymity ? parseInt(chat.anonymity, 10) : 0,
            user_id: chat.user_id,
            mail: chat.mail,
            content: chat.content,
            deleted: 0,
          } satisfies ApiChat,
        } satisfies RawApiResponse)
    )

  // CM パートを検出
  const cmLength = cmLengthMap[request.channel]
  if (cmLength === undefined) {
    console.info(
      `[anime-comment-overlay] CM detection for channel ${request.channel} unsupported. Please contribute to this project!`
    )
  } else if (cmLength === 0) {
    console.info(`[anime-comment-overlay] channel ${request.channel} does not have CM`)
  } else {
    for (const symbol of partSymbols) {
      const partChats = chats.filter((x) => x.chat.content === symbol)
      if (!hasMinLength(partChats, partSymbolThreshold)) {
        continue
      }

      // CM 区間のコメントを除去
      let removes = 0
      const effectiveCmLength = cmLength + (partSymbols.indexOf(symbol) === 0 ? additionalCmLength : 0)
      const cmEndDate = partChats[0].chat.date - partSymbolAdjustment
      const cmStartDate = cmEndDate - effectiveCmLength
      for (const c of chats.filter(({ chat }) => cmStartDate < chat.date && chat.date <= cmEndDate)) {
        c.chat.deleted = 1
        removes++
      }
      console.info(`[anime-comment-overlay] CM part: ${symbol} (${removes} chats deleted)`)

      // CM 区間後の時刻をシフト
      let shifts = 0
      for (const c of chats.filter(({ chat }) => cmEndDate < chat.date)) {
        c.chat.date -= effectiveCmLength
        shifts++
      }
      console.info(`[anime-comment-overlay] CM part: ${symbol} (${shifts} chats shifted)`)
    }
  }

  return (
    chats
      // 追加の削除済みコメントを除去
      .filter(({ chat }) => chat.deleted === 0)
      .map(
        ({ chat }) =>
          ({
            chat: {
              ...chat,
              // 最初の開始時刻から vpos を再計算
              vpos: Math.max(
                (chat.date - request.startTime) * 100 + Math.floor(chat.date_usec / 10000) - vposAdjustment,
                0
              ),
            } satisfies ApiChat,
          } satisfies RawApiResponse)
      )
  )
}

type Program = {
  channel: SayaDefinitions['channels'][0]
  startedAt: number
  endedAt: number
}

async function findPrograms(episode: Episode): Promise<Program[]> {
  if (episode.workIds.length === 0) {
    return []
  }

  const arm = await fetchArmEntries()
  const syobocalTids = arm
    .filter((e) => e.annict_id !== undefined && episode.workIds.includes(e.annict_id))
    .map((e) => e.syobocal_tid)
    .filter((x): x is NonNullable<typeof x> => x !== undefined)
    // 重複除去
    .filter((x, idx, array) => idx === array.indexOf(x))
  console.info(`[anime-comment-overlay] found syobocal tids: ${syobocalTids}`)

  const saya = await fetchSayaDefinitions()
  const programs = await fetchSyobocalProgLookup(syobocalTids)
  return (
    // 指定された話数のみを抽出する
    programs.ProgLookupResponse?.ProgItems?.ProgItem?.filter((p) => p.Count === episode.episodeNumber)
      ?.map((p) => {
        // まだ放送されてない
        const startedAt = Date.parse(p.StTime) / 1000
        if (Date.now() / 1000 < startedAt) {
          return
        }

        // まだ終わってない
        const endedAt = Date.parse(p.EdTime) / 1000
        if (Date.now() / 1000 < endedAt) {
          return
        }

        // しょぼかるのチャンネルID <-> saya のチャンネル変換
        const channel = saya.channels.find((c) => c.syobocalId === p.ChID)
        if (channel === undefined) {
          return
        }

        console.info(`[anime-comment-overlay] found program: ${channel.name} (${p.StTime} ~ ${p.EdTime})`)

        return {
          channel,
          startedAt,
          endedAt,
        } satisfies Program
      })
      ?.filter((x): x is NonNullable<typeof x> => x !== undefined) ?? []
  )
}

type CommentProviderModule = {
  name: string
  provide(program: Program): Promise<RawApiResponse[]>
}

const providers: CommentProviderModule[] = [
  {
    name: 'ニコニコ実況過去ログ',
    async provide(program: Program): Promise<RawApiResponse[]> {
      const jkId = program.channel.nicojkId
      if (jkId === undefined) {
        return []
      }

      const request = {
        channel: `jk${jkId}` as NiconicoJikkyoChannel,
        startTime: program.startedAt,
        endTime: program.endedAt,
      }
      const response = await fetchNiconicoJikkyoKakoLog(request)
      return parseNiconicoJikkyoKakoLogResponse(request, response)
    },
  },
]

async function fetchComments(episode: Episode): Promise<RawApiResponse[]> {
  const programs = await findPrograms(episode)

  const comments: RawApiResponse[] = []
  const promises = providers.map((p) => programs.map(async (pg) => p.provide(pg))).flat()
  for (const r of await Promise.allSettled(promises)) {
    switch (r.status) {
      case 'fulfilled':
        comments.push(...r.value)
        break
      case 'rejected':
        console.error(`[anime-comment-overlay] fetchComments rejected: ${r.reason}`)
    }
  }

  return comments
}

async function applyModule(module: CommentOverlayModule, params: string[]): Promise<void> {
  const { video, canvas, toggleButton } = module.initializeContainers()

  const episode = await module.detectEpisode(...params)
  console.info(`[anime-comment-overlay] episode: ${JSON.stringify(episode)}`)

  const comments = await fetchComments(episode)
  const renderer = new NiconiComments(canvas, comments, {
    format: 'legacy',
  })

  let isHide = false
  const interval = setInterval(() => {
    if (isHide) {
      return
    }

    renderer.drawCanvas(Math.floor(video.currentTime * 100))
  }, 10)

  toggleButton?.addEventListener('click', () => {
    isHide = !isHide
    if (isHide) {
      renderer.clear()
    }
  })

  function onEpisodeChanged() {
    module.removeEventListener('episodeChanged', onEpisodeChanged)
    clearInterval(interval)
    renderer.clear()
    applyModule(module, params).catch(console.error)
    console.info('[anime-comment-overlay] episode changed')
  }
  module.addEventListener('episodeChanged', onEpisodeChanged)
}

for (const module of modules) {
  const match = module.url.exec(window.location.href)
  if (match === null) {
    continue
  }

  console.info(`[anime-comment-overlay] applying ${module.name}`)
  applyModule(module, match.slice(1)).catch(console.error)
  break
}
