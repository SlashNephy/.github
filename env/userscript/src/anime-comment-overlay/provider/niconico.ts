import { hasMinLength } from 'ts-array-length'

import { fetchNiconicoJikkyoKakoLog } from '../../../lib/external/tsukumijima'
import {
  ChannelCmAttributes,
  copyrightCmAttributes,
  opAdjustment,
  opLength,
  opSymbolCommentsThreshold,
  opSymbols,
  partSymbolAdjustment,
  partSymbolCommentsThreshold,
  partSymbols,
  vposAdjustment,
} from '../constant'

import type { Program } from './index'
import type { NiconicoJikkyoChannel, NiconicoJikkyoKakoLogResponse } from '../../../lib/external/tsukumijima'
import type { Media } from '../overlay'
import type { ApiChat, RawApiResponse } from '@xpadev-net/niconicomments'

export const NiconicoJikkyoKakoLogProvider = {
  name: 'ニコニコ実況過去ログ',
  async provide(media: Media, program: Program): Promise<RawApiResponse[]> {
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

    // 変換
    const chats = this.convertChats(response)

    // CM パートをトリム
    const attr = ChannelCmAttributes[request.channel]
    switch (attr) {
      case undefined:
        console.info(
          `[anime-comment-overlay] CM detection for channel ${request.channel} unsupported. Please contribute to this project!`
        )
        break
      case null:
        console.info(`[anime-comment-overlay] channel ${request.channel} does not have CM`)
        break
      default:
        console.log(`[anime-comment-overlay] CM attribute for channel ${request.channel}`, attr)

        this.processHeadCms(chats, attr.head, request.startTime)
        for (const symbol of partSymbols) {
          this.processIntervalCms(chats, symbol, attr.normal, attr.sponsor)
        }
    }

    let copyrightAdjustment = 0
    if (media.platform === 'danime') {
      const attr2 = copyrightCmAttributes.find((a) => a.pattern.test(media.copyright))
      if (attr2 !== undefined) {
        copyrightAdjustment = attr2.adjustment

        console.info(`[anime-comment-overlay] copyright adjustment for ${media.copyright}: ${copyrightAdjustment}`)
      }
    }

    return (
      chats
        // 追加の削除済みコメントを除去
        .filter((c) => c.deleted === 0)
        .map(
          (c) =>
            ({
              chat: {
                ...c,
                // 最初の開始時刻から vpos を再計算
                vpos: Math.max(
                  copyrightAdjustment +
                    (c.date - request.startTime) * 100 +
                    Math.floor(c.date_usec / 10000) -
                    vposAdjustment,
                  0
                ),
              } satisfies ApiChat,
            } satisfies RawApiResponse)
        )
    )
  },
  convertChats(response: NiconicoJikkyoKakoLogResponse): ApiChat[] {
    if ('error' in response) {
      console.error(`[anime-comment-overlay] received error from niconico jikkyo kako log: ${response.error}`)
      return []
    }

    return (
      response.packet
        // 削除済みコメント/あぼん除去
        .filter(({ chat }) => chat.deleted !== '1' && chat.abone !== '1')
        // 過去ログ API の型を変換
        .map(
          ({ chat }) =>
            ({
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
            } satisfies ApiChat)
        )
    )
  },
  processHeadCms(chats: ApiChat[], headInterval: number, startTime: number): void {
    if (headInterval === 0) {
      return
    }

    // 先頭 CM 区間のコメントを除去
    let removes = 0
    const cmStartTime = startTime
    const cmEndTime = startTime + headInterval
    for (const chat of chats.filter((c) => cmStartTime < c.date && c.date <= cmEndTime)) {
      chat.deleted = 1
      removes++
    }
    console.info(`[anime-comment-overlay] CM part: head (${removes} chats deleted)`)

    // 先頭 CM 区間後の時刻をシフト
    let shifts = 0
    for (const chat of chats.filter((c) => cmEndTime < c.date)) {
      chat.date -= headInterval
      shifts++
    }
    console.info(`[anime-comment-overlay] CM part: head (${shifts} chats shifted)`)
  },
  processIntervalCms(chats: ApiChat[], symbol: string, normalInterval: number, sponsorInterval: number): void {
    const partChats = chats.filter((c) => c.content === symbol)
    if (!hasMinLength(partChats, partSymbolCommentsThreshold)) {
      return
    }

    // OP から時間が空いていない場合はカットしない
    if (partSymbols.indexOf(symbol) === 0) {
      const opChats = chats.filter((c) => opSymbols.includes(c.content))
      if (hasMinLength(opChats, opSymbolCommentsThreshold)) {
        const opStartTime = opChats[0].date
        const opEndTime = opStartTime + opLength
        if (opStartTime < partChats[0].date && partChats[0].date < opEndTime + opAdjustment) {
          console.info(`[anime-comment-overlay] OP part: ${symbol}`)
          return
        }
      }
    }

    // CM 区間のコメントを除去
    let removes = 0
    const effectiveCmLength = normalInterval + (partSymbols.indexOf(symbol) === 0 ? sponsorInterval : 0)
    const cmEndTime = partChats[0].date - partSymbolAdjustment
    const cmStartTime = cmEndTime - effectiveCmLength
    for (const chat of chats.filter((c) => cmStartTime < c.date && c.date <= cmEndTime)) {
      chat.deleted = 1
      removes++
    }
    console.info(`[anime-comment-overlay] CM part: ${symbol} (${removes} chats deleted)`)

    // CM 区間後の時刻をシフト
    let shifts = 0
    for (const chat of chats.filter((c) => cmEndTime < c.date)) {
      chat.date -= effectiveCmLength
      shifts++
    }
    console.info(`[anime-comment-overlay] CM part: ${symbol} (${shifts} chats shifted)`)
  },
}
