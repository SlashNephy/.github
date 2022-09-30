import { executeXhr } from './api'

import type { GetAnimeByIdResponse } from '../types/jikan'

export const getAnimeById = async (id: number): Promise<GetAnimeByIdResponse> => {
  const content = await executeXhr({
    url: `https://api.jikan.moe/v4/anime/${id}`,
  })

  return JSON.parse(content.responseText) as GetAnimeByIdResponse
}
