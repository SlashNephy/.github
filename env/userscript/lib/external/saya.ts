export type SayaDefinitions = {
  channels: {
    name: string
    type: 'GR' | 'BS' | 'CS' | 'SKY'
    serviceIds: number[]
    networkId: number
    flag?: number
    nicojkId?: number
    hasOfficialNicolive?: boolean
    nicoliveTags?: string[]
    nicoliveCommunityIds?: string[]
    miyoutvId?: string
    twitterKeywords?: string[]
    boardIds?: string[]
    syobocalId?: number
    annictId?: number
  }[]
  boards: {
    id: string
    name: string
    server: string
    board: string
    keywords?: string[]
  }[]
}

export async function fetchSayaDefinitions(branch = 'master'): Promise<SayaDefinitions> {
  const response = await fetch(
    `https://raw.githubusercontent.com/SlashNephy/saya-definitions/${branch}/definitions.json`
  )
  return response.json()
}
