import { findKanjiNumbers, kanji2number } from '@geolonia/japanese-numeral'
import { hasMinLength } from 'ts-array-length'

import { fetchArmEntries } from '../../../lib/external/arm'
import { fetchSayaDefinitions } from '../../../lib/external/saya'
import { fetchSyobocalProgLookup, fetchSyobocalProgLookupWithRange } from '../../../lib/external/syobocal'

import type { SayaDefinitions } from '../../../lib/external/saya'
import type { SyobocalProgLookup, SyobocalProgItem } from '../../../lib/external/syobocal'
import type { Media } from '../overlay'
import type { FormattedComment } from '@xpadev-net/niconicomments'

export type CommentProviderModule = {
  name: string
  provide(media: Media, program: Program): Promise<Comment[]>
}

export type Program = {
  channel: SayaDefinitions['channels'][0]
  startedAt: number
  endedAt: number
}

export type Comment = {
  providerId: number
  id: number
  vpos: number
  content: string
  date: number
  dateUsec: number
  userId: number
  isPremium: boolean
  mails: string[]
  layer: number
  isDeleted: boolean
}

export async function findPrograms(media: Media): Promise<Program[]> {
  const saya = await fetchSayaDefinitions()
  const serviceId = media.video?.channel.serviceId
  if (serviceId !== undefined && media.video !== undefined) {
    const chId = saya.channels.find((x) => x.type === media.video?.channel.type && x.serviceIds.includes(serviceId))
      ?.syobocalId
    if (chId !== undefined) {
      const programs = await fetchSyobocalProgLookupWithRange(media.video.startedAt, media.video.endedAt, chId)
      return convertPrograms(programs, undefined, saya)
    }
  }

  if (media.work?.annictIds.length === 0) {
    return []
  }

  const arm = await fetchArmEntries()
  const syobocalTids = arm
    .filter((e) => e.annict_id !== undefined && media.work?.annictIds.includes(e.annict_id))
    .map((e) => e.syobocal_tid)
    .filter((x): x is NonNullable<typeof x> => x !== undefined)
    // 重複除去
    .filter((x, idx, array) => idx === array.indexOf(x))
  console.info(`[anime-comment-overlay] found syobocal tids: ${syobocalTids}`)

  const programs = await fetchSyobocalProgLookup(syobocalTids)

  // 話数がない場合は劇場版などがある
  const episodeNumber = extractEpisodeNumber(media.episode?.number)
  return convertPrograms(programs, episodeNumber, saya)
}

function convertPrograms(
  response: SyobocalProgLookup,
  episodeNumber: number | undefined,
  saya: SayaDefinitions
): Program[] {
  const items = Array.isArray(response.ProgLookupResponse?.ProgItems?.ProgItem)
    ? response.ProgLookupResponse?.ProgItems?.ProgItem
    : [response.ProgLookupResponse?.ProgItems?.ProgItem]
  return (
    // 指定された話数のみを抽出する
    items
      ?.filter((p): p is NonNullable<SyobocalProgItem> => p !== undefined)
      .filter((p) => episodeNumber === undefined || p.Count === episodeNumber)
      ?.map((p) => {
        // まだ放送されてない
        const startedAt = Date.parse(p.StTime) / 1000
        if (Date.now() / 1000 < startedAt) {
          return null
        }

        // まだ終わってない
        const endedAt = Date.parse(p.EdTime) / 1000
        if (Date.now() / 1000 < endedAt) {
          return null
        }

        // しょぼかるのチャンネルID <-> saya のチャンネル変換
        const channel = saya.channels.find((c) => c.syobocalId === p.ChID)
        if (channel === undefined) {
          return null
        }

        console.info(`[anime-comment-overlay] found program: ${channel.name} (${p.StTime} ~ ${p.EdTime})`)

        return {
          channel,
          startedAt,
          endedAt,
        } satisfies Program
      })
      ?.filter((x): x is NonNullable<typeof x> => x !== null)
      ?.sort((a, b) => a.startedAt - b.startedAt) ?? []
  )
}

function extractEpisodeNumber(text: string | number | undefined): number | undefined {
  if (typeof text === 'number') {
    return text
  }
  if (text === undefined) {
    return undefined
  }

  // TODO: ローマ数字対応

  // 全角 → 半角

  text = text.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248))

  // アラビア数字 → number
  const match = /\d+(\.\d+)?/.exec(text.replace(',', ''))
  if (match && hasMinLength(match, 1)) {
    return parseFloat(match[0])
  }

  // 漢数字 → number
  const kanjis = findKanjiNumbers(text)
  if (hasMinLength(kanjis, 1)) {
    return kanji2number(kanjis[0])
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function* fetchComments(
  providers: CommentProviderModule[],
  media: Media,
  programs: Program[]
): AsyncGenerator<FormattedComment[]> {
  const promises: Promise<FormattedComment[]>[] = providers
    .map((provider) =>
      programs.map(async (program) =>
        provider
          .provide(media, program)
          .then((comments) => {
            if (comments.length === 0) {
              return []
            }

            console.info(`[anime-comment-overlay] fetched ${comments.length} comments from ${provider.name}`)

            return comments.map((c) => ({
              id: c.id * c.providerId,
              vpos: c.vpos,
              content: c.content,
              date: c.date,
              date_usec: c.dateUsec,
              user_id: c.userId * c.providerId,
              owner: !c.userId,
              premium: c.isPremium,
              mail: c.mails,
              layer: c.layer,
            }))
          })
          .catch((e) => {
            console.error(`[anime-comment-overlay] failed to comments from ${provider.name}: ${e}`)
            return []
          })
      )
    )
    .flat()

  for (const promise of promises) {
    yield promise
  }
}
