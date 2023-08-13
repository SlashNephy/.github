export async function fetchEpgStationRecordedItem(id: string): EpgStationRecordedItem {
  // TODO: support EPGStation sub directory installation
  const response = await fetch(`/api/recorded/${id}`)
  return await response.json()
}

export type EpgStationRecordedItem = {
  id: number
  ruleId: number
  programId: number
  channelId: number
  startAt: number
  endAt: number
  name: string
  description: string
  extended: string
  rawExtended: {}
  genre1: number
  subGenre1: number
  genre2: number
  subGenre2: number
  genre3: number
  subGenre3: number
  videoType: string
  videoResolution: string
  videoStreamContent: number
  videoComponentType: number
  audioSamplingRate: number
  audioComponentType: number
  isRecording: boolean
  thumbnails: number[]
  videoFiles: {
    id: number
    name: string
    filename: string
    type: string
    size: number
  }[]
  dropLog: {
    id: number
    errorCnt: number
    dropCnt: number
    scramblingCnt: number
  }
  tags: {
    id: number
    name: string
    color: string
  }[]
  isEncoding: boolean
  isProtected: boolean
}
