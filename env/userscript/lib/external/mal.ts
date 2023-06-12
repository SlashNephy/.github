export type MalAnimeScore = {
  id: number
  title: string
  main_picture: {
    medium: string
    large: string
  }
  mean: number | null
  alternative_titles: {
    ja: string | null
  }
}

const MalClientId = '6b13c8a22ad3a5e16dd52f548ba7d545'

export async function fetchMalAnimeScoreById(id: number): Promise<MalAnimeScore> {
  const response = await fetch(`https://api.myanimelist.net/v2/anime/${id}?fields=mean`, {
    headers: {
      'X-MAL-CLIENT-ID': MalClientId,
    },
  })
  return response.json()
}
