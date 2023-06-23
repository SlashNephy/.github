export type NiconicoJikkyoKakoLogResponse =
  | {
      packet: {
        chat: {
          thread: string
          no: string
          vpos: string
          date: string
          date_usec?: string
          mail?: string
          user_id: string
          name?: string
          anonymity?: '1'
          premium?: '1'
          deleted?: '1'
          content: string
          abone?: '1'
          nicoru?: string
        }
      }[]
    }
  | {
      error: string
    }

export type NiconicoJikkyoChannel =
  | 'jk1'
  | 'jk2'
  | 'jk4'
  | 'jk5'
  | 'jk6'
  | 'jk7'
  | 'jk8'
  | 'jk9'
  | 'jk101'
  | 'jk211'
  | 'jk103'
  | 'jk141'
  | 'jk151'
  | 'jk161'
  | 'jk171'
  | 'jk181'
  | 'jk191'
  | 'jk192'
  | 'jk193'
  | 'jk222'
  | 'jk236'
  | 'jk252'
  | 'jk260'
  | 'jk263'
  | 'jk265'
  | 'jk333'
  | 'jk10'
  | 'jk11'
  | 'jk12'

export type NiconicoJikkyoKakoLogRequest = {
  channel: NiconicoJikkyoChannel
  startTime: number
  endTime: number
}

export async function fetchNiconicoJikkyoKakoLog({
  channel,
  startTime,
  endTime,
}: NiconicoJikkyoKakoLogRequest): Promise<NiconicoJikkyoKakoLogResponse> {
  const response = await fetch(
    `https://jikkyo.tsukumijima.net/api/kakolog/${channel}?starttime=${startTime}&endtime=${endTime}&format=json`
  )
  return response.json()
}
