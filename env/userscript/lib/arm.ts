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
    url: 'https://raw.githubusercontent.com/SlashNephy/arm-supplementary/master/dist/arm.json',
  })
  return JSON.parse(response.responseText) as ArmEntry[]
}
