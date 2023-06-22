import { findKanjiNumbers, kanji2number } from '@geolonia/japanese-numeral'
import { hasMinLength } from 'ts-array-length'

import { fetchArmEntries } from '../../../lib/external/arm'
import { fetchSayaDefinitions } from '../../../lib/external/saya'
import { fetchSyobocalProgLookup } from '../../../lib/external/syobocal'

import type { SayaDefinitions } from '../../../lib/external/saya'
import type { Media } from '../overlay'
import type { RawApiResponse } from '@xpadev-net/niconicomments'

export type CommentProviderModule = {
  name: string
  provide(media: Media, program: Program): Promise<RawApiResponse[]>
}

export type Program = {
  channel: SayaDefinitions['channels'][0]
  startedAt: number
  endedAt: number
}

export async function findPrograms(media: Media): Promise<Program[]> {
  if (media.work.annictIds.length === 0) {
    return []
  }

  const arm = await fetchArmEntries()
  const syobocalTids = arm
    .filter((e) => e.annict_id !== undefined && media.work.annictIds.includes(e.annict_id))
    .map((e) => e.syobocal_tid)
    .filter((x): x is NonNullable<typeof x> => x !== undefined)
    // 重複除去
    .filter((x, idx, array) => idx === array.indexOf(x))
  console.info(`[anime-comment-overlay] found syobocal tids: ${syobocalTids}`)

  const saya = await fetchSayaDefinitions()
  const programs = await fetchSyobocalProgLookup(syobocalTids)

  // 話数がない場合は劇場版などがある
  const episodeNumber = extractEpisodeNumber(media.episode.number)
  return (
    // 指定された話数のみを抽出する
    programs.ProgLookupResponse?.ProgItems?.ProgItem?.filter(
      (p) => episodeNumber === undefined || p.Count === episodeNumber
    )
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
      ?.filter((x): x is NonNullable<typeof x> => x !== undefined)
      ?.sort((a, b) => b.startedAt - a.startedAt) ?? []
  )
}

function extractEpisodeNumber(text: string | undefined): number | undefined {
  if (text === undefined) {
    return undefined
  }

  // TODO: ローマ数字対応

  // 全角 → 半角
  // eslint-disable-next-line no-param-reassign
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

export async function fetchComments(
  providers: CommentProviderModule[],
  media: Media,
  programs: Program[]
): Promise<RawApiResponse[]> {
  const comments: RawApiResponse[] = []

  const promises = providers.map((p) => programs.map(async (pg) => [p, await p.provide(media, pg)] as const)).flat()
  for (const r of await Promise.allSettled(promises)) {
    switch (r.status) {
      case 'fulfilled': {
        const [provider, results] = r.value
        comments.push(...results)
        console.info(`[anime-comment-overlay] fetched ${results.length} comments from ${provider.name}`)
        break
      }
      case 'rejected':
        console.error(`[anime-comment-overlay] failed to comments: ${r.reason}`)
    }
  }

  return comments
}
