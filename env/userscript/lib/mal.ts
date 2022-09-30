import { executeXhr } from './api'

import type { GetAnimeScoreResponse } from '../types/mal'

export const getAnimeScoreById = async (id: number): Promise<GetAnimeScoreResponse> => {
  const content = await executeXhr({
    url: `https://api.myanimelist.net/v2/anime/${id}?fields=mean`,
    headers: {
      'X-MAL-CLIENT-ID': '6b13c8a22ad3a5e16dd52f548ba7d545',
    },
  })

  return JSON.parse(content.responseText) as GetAnimeScoreResponse
}
