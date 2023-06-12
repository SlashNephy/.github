export type JikanAnime = {
  data: {
    mal_id: number
    url: string
    images: {
      jpg: {
        image_url: string
        small_image_url: string
        large_image_url: string
      }
      webp: {
        image_url: string
        small_image_url: string
        large_image_url: string
      }
    }
    trailer: {
      youtube_id: string | null
      url: string | null
      embed_url: string | null
      images: {
        image_url: string | null
        small_image_url: string | null
        medium_image_url: string | null
        large_image_url: string | null
        maximum_image_url: string | null
      }
    }
    approved: boolean
    titles: { type: string; title: string }[]
    title: string
    title_english: string
    title_japanese: string
    title_synonyms: string[]
    type: string
    source: string
    episodes: number
    status: string
    airing: boolean
    aired: {
      from: string
      to: string
      prop: { from: { day: number; month: number; year: number }; to: { day: number; month: number; year: number } }
      string: string
    }
    duration: string
    rating: string
    score: number | null
    scored_by: number
    rank: number
    popularity: number
    members: number
    favorites: number
    synopsis: string
    background: null
    season: string
    year: number
    broadcast: { day: string; time: string; timezone: string; string: string }
    producers: { mal_id: number; type: string; name: string; url: string }[]
    licensors: []
    studios: {
      mal_id: number
      type: string
      name: string
      url: string
    }[]
    genres: {
      mal_id: number
      type: string
      name: string
      url: string
    }[]
    explicit_genres: []
    themes: {
      mal_id: number
      type: string
      name: string
      url: string
    }[]
    demographics: {
      mal_id: number
      type: string
      name: string
      url: string
    }[]
  }
}

export async function fetchJikanAnimeById(id: number): Promise<JikanAnime> {
  const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
  return response.json()
}
