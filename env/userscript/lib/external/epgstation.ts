export async function fetchEpgStationRecordedItem(id: string): Promise<EpgStationRecordedItem> {
  // TODO: support EPGStation sub directory installation
  const response = await fetch(`/api/recorded/${id}?isHalfWidth=true`)
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
  rawExtended: Record<string, string>
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

export async function fetchEpgStationChannels(): Promise<EpgStationChannel[]> {
  const response = await fetch('/api/channels')
  return await response.json()
}

export type EpgStationChannel = {
  id: number
  serviceId: number
  networkId: number
  name: string
  halfWidthNam: string
  hasLogoData: boolean
  channelType: 'GR' | 'BS' | 'CS' | 'SKY'
  channel: string
  type: number
  remoteControlKeyId?: number
}
