import { executeXhr } from './api'

export type ArmEntry = {
  mal_id?: number
  anilist_id?: number
  annict_id?: number
  syobocal_tid?: number
}

export const fetchArmEntries = async (): Promise<ArmEntry[]> => {
  const response = await executeXhr({
    method: 'GET',
    url: 'https://raw.githubusercontent.com/kawaiioverflow/arm/master/arm.json',
  })
  return JSON.parse(response.responseText) as ArmEntry[]
}
