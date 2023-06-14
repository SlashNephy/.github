export type AnnictBroadcastData = {
  work_id: number
  program_id: number
  channel_id: number
  channel_name: string
  started_time?: string
  is_rebroadcast: boolean
  vod_code?: string
  vod_title?: string
}

export async function fetchAnnictBroadcastData(branch = 'master'): Promise<AnnictBroadcastData[]> {
  const response = await fetch(
    `https://raw.githubusercontent.com/SlashNephy/.github/${branch}/env/userscript/bin/collect-vod-data/dist/data.json`
  )
  return response.json()
}
