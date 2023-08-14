import { XMLParser } from 'fast-xml-parser'

import { executeGmXhr } from '../tampermonkey/executeGmXhr'

export type SingleOrArray<T> = T | T[]

export type SyobocalProgItem = {
  /* eslint-disable @typescript-eslint/naming-convention */
  LastUpdate: string
  PID: number
  TID: number
  StTime: string
  StOffset: number
  EdTime: string
  Count: number | ''
  SubTitle: string
  ProgComment: string
  Flag: number
  Deleted: number
  Warn: number
  ChID: number
  Revision: number
  STSubTitle?: string
  /* eslint-enable @typescript-eslint/naming-convention */
}

export type SyobocalProgLookup = {
  /* eslint-disable @typescript-eslint/naming-convention */
  ProgLookupResponse?: {
    ProgItems?: {
      ProgItem?: SingleOrArray<SyobocalProgItem>
    }
    Result: {
      Code: number
      Message: string
    }
  }
  /* eslint-enable @typescript-eslint/naming-convention */
}

export async function fetchSyobocalProgLookup(tids: number[]): Promise<SyobocalProgLookup> {
  // XXX: CORS を回避するために GM_xmlhttpRequest を使う
  // eslint-disable-next-line deprecation/deprecation
  const { responseText } = await executeGmXhr({
    url: `https://cal.syoboi.jp/db.php?Command=ProgLookup&TID=${tids.join(',')}`,
  })
  const parser = new XMLParser()
  return parser.parse(responseText)
}

export async function fetchSyobocalProgLookupWithRange(
  startTime: Date,
  endTime: Date,
  chId: number
): Promise<SyobocalProgLookup> {
  function zerofill(n: number): string {
    return `00${n}`.slice(-2)
  }
  function format(d: Date): string {
    return `${d.getFullYear()}${zerofill(d.getMonth() + 1)}${zerofill(d.getDate())}_${zerofill(d.getHours())}${zerofill(
      d.getMinutes()
    )}${zerofill(d.getSeconds())}`
  }

  // XXX: CORS を回避するために GM_xmlhttpRequest を使う
  // eslint-disable-next-line deprecation/deprecation
  const { responseText } = await executeGmXhr({
    url: `https://cal.syoboi.jp/db.php?Command=ProgLookup&Range=${format(startTime)}-${format(endTime)}&ChID=${chId}`,
  })
  const parser = new XMLParser()
  return parser.parse(responseText)
}

export type SyobocalTitleLookup = {
  /* eslint-disable @typescript-eslint/naming-convention */
  TitleLookupResponse?: {
    TitleItems?: {
      TitleItem?: {
        TID: number
        LastUpdate: string
        Title: string
        ShortTitle: string
        TitleYomi: string
        TitleEN: string
        Comment: string
        Cat: number
        TitleFlag: number
        FirstYear: number
        FirstMonth: number
        FirstEndYear: number
        FirstEndMonth: number
        FirstCh: string
        Keywords: string
        UserPoint: number
        UserPointRank: number
        SubTitles: string
      }[]
    }
    Result: {
      Code: number
      Message: string
    }
  }
  /* eslint-enable @typescript-eslint/naming-convention */
}

export async function fetchSyobocalTitleLookup(tids: number[]): Promise<SyobocalTitleLookup> {
  // XXX: CORS を回避するために GM_xmlhttpRequest を使う
  // eslint-disable-next-line deprecation/deprecation
  const { responseText } = await executeGmXhr({
    url: `https://cal.syoboi.jp/db.php?Command=TitleLookup&TID=${tids.join(',')}`,
  })
  const parser = new XMLParser()
  return parser.parse(responseText)
}
