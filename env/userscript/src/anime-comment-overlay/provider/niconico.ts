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

import type { Comment, CommentProviderModule, Program } from './index'
import type { NiconicoJikkyoChannel, NiconicoJikkyoKakoLogResponse } from '../../../lib/external/tsukumijima'
import type { Media } from '../overlay'

export const NiconicoJikkyoKakoLogProvider: CommentProviderModule = {
  name: 'ニコニコ実況過去ログ',
  async provide(media: Media, program: Program): Promise<Comment[]> {
    const jkId = program.channel.nicojkId
    if (jkId === undefined) {
      return []
    }

    const request = {
      channel: `jk${jkId}` as NiconicoJikkyoChannel,
      startTime: program.startedAt,
      endTime: program.endedAt,
    }

    // 変換
    const response = await fetchNiconicoJikkyoKakoLog(request)
    const chats = convertChats(response)

    // CM パートをトリムする
    const attr = ChannelCmAttributes[request.channel]
    if (media.video !== undefined) {
      console.info('[anime-comment-overlay] this media is video', media)
    } else if (attr === null) {
      console.info(`[anime-comment-overlay] channel ${request.channel} does not have CM`, program)
    } else {
      console.log(`[anime-comment-overlay] CM attribute for channel ${request.channel}`, attr, program)

      processHeadCms(chats, attr.head, program)
      for (const symbol of partSymbols) {
        processIntervalCms(chats, symbol, attr.normal, attr.sponsor, program)
      }
    }

    let copyrightAdjustment = 0
    const copyright = media.work?.copyright
    if (copyright !== undefined) {
      const attr2 = copyrightCmAttributes.find((a) => a.pattern.test(copyright))
      if (attr2 !== undefined) {
        copyrightAdjustment = attr2.adjustment

        console.info(`[anime-comment-overlay] copyright adjustment for ${copyright}: ${copyrightAdjustment}`, program)
      }
    }

    return (
      chats
        // 追加の削除済みコメントを除去
        .filter((c) => !c.isDeleted)
        .map((c) => ({
          ...c,
          // 最初の開始時刻から vpos を再計算
          vpos: Math.max(
            copyrightAdjustment + (c.date - request.startTime) * 100 + Math.floor(c.dateUsec / 10000) - vposAdjustment,
            0
          ),
        }))
    )
  },
}

function convertChats(response: NiconicoJikkyoKakoLogResponse): Comment[] {
  if ('error' in response) {
    console.error(`[anime-comment-overlay] received error from niconico jikkyo kako log: ${response.error}`)
    return []
  }

  const users: string[] = []
  return (
    response.packet
      // 削除済みコメント/あぼん除去
      .filter(({ chat }) => chat.deleted !== '1' && chat.abone !== '1')
      // 過去ログ API の型を変換
      .map(({ chat }) => {
        const mails = chat.mail ? chat.mail.split(/\s+/g) : []
        if (chat.content.startsWith('/')) {
          mails.push('invisible')
        }

        let userId = users.indexOf(chat.user_id)
        if (userId < 0) {
          userId = users.length
          users.push(chat.user_id)
        }

        return {
          providerId: 1,
          id: parseInt(chat.no, 10),
          // 後で計算するので一旦適当に埋めておく
          vpos: 0,
          content: chat.content,
          date: parseInt(chat.date, 10),
          // date_usec がない場合は乱数で置き換える
          dateUsec: chat.date_usec ? parseInt(chat.date_usec, 10) : Math.floor(Math.random() * 100000),
          userId,
          isPremium: chat.premium === '1',
          mails,
          layer: -1,
          isDeleted: false,
        }
      })
  )
}

function processHeadCms(comments: Comment[], headInterval: number, program: Program) {
  if (headInterval === 0) {
    return
  }

  // 先頭 CM 区間のコメントを除去
  let removes = 0
  const cmStartTime = program.startedAt
  const cmEndTime = program.startedAt + headInterval
  for (const comment of comments.filter((c) => cmStartTime < c.date && c.date <= cmEndTime)) {
    comment.isDeleted = true
    removes++
  }
  console.info(`[anime-comment-overlay] CM part: head (${removes} comments deleted)`, program)

  // 先頭 CM 区間後の時刻をシフト
  let shifts = 0
  for (const comment of comments.filter((c) => cmEndTime < c.date)) {
    comment.date -= headInterval
    shifts++
  }
  console.info(`[anime-comment-overlay] CM part: head (${shifts} comments shifted)`, program)
}

function processIntervalCms(
  comments: Comment[],
  symbol: string,
  normalInterval: number,
  sponsorInterval: number,
  program: Program
) {
  const partComments = comments.filter((c) => c.content === symbol)
  if (!hasMinLength(partComments, partSymbolCommentsThreshold)) {
    return
  }

  // OP から時間が空いていない場合はカットしない
  if (partSymbols.indexOf(symbol) === 0) {
    const opComments = comments.filter((c) => opSymbols.includes(c.content))
    if (hasMinLength(opComments, opSymbolCommentsThreshold)) {
      const opStartTime = opComments[0].date
      const opEndTime = opStartTime + opLength
      if (opStartTime < partComments[0].date && partComments[0].date < opEndTime + opAdjustment) {
        console.info(`[anime-comment-overlay] OP part: ${symbol}`, program)
        return
      }
    }
  }

  // CM 区間のコメントを除去
  let removes = 0
  const effectiveCmLength = normalInterval + (partSymbols.indexOf(symbol) === 0 ? sponsorInterval : 0)
  const cmEndTime = partComments[0].date - partSymbolAdjustment
  const cmStartTime = cmEndTime - effectiveCmLength
  for (const comment of comments.filter((c) => cmStartTime < c.date && c.date <= cmEndTime)) {
    comment.isDeleted = true
    removes++
  }
  console.info(`[anime-comment-overlay] CM part: ${symbol} (${removes} comments deleted)`, program)

  // CM 区間後の時刻をシフト
  let shifts = 0
  for (const comment of comments.filter((c) => cmEndTime < c.date)) {
    comment.date -= effectiveCmLength
    shifts++
  }
  console.info(`[anime-comment-overlay] CM part: ${symbol} (${shifts} comments shifted)`, program)
}
