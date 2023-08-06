import { executeGmXhr } from '../tampermonkey/executeGmXhr'

export async function fetchNetflixMediaMetadata(baseUrl: string, episodeId: string): Promise<NetflixMediaMetadata> {
  // CORS を回避する
  // eslint-disable-next-line deprecation/deprecation
  const { responseText } = await executeGmXhr({
    method: 'GET',
    url: `${baseUrl}/metadata?movieid=${episodeId}`,
  })

  return JSON.parse(responseText)
}

export type NetflixMediaMetadata = {
  version: string
  trackIds: {
    nextEpisode: number
    episodeSelector: number
  }
  video: {
    title: string
    synopsis: string
    rating: string
    artwork: {
      w: number
      h: number
      url: string
    }[]
    boxart: {
      w: number
      h: number
      url: string
    }[]
    storyart: {
      w: number
      h: number
      url: string
    }[]
    type: string
    unifiedEntityId: string
    id: number
    userRating: {
      matchScore: number
      tooNewForMatchScore: boolean
      type: string
      userRating: number
    }
    skipMarkers: {
      credit: {
        start: unknown
        end: unknown
      }
      recap: {
        start: unknown
        end: unknown
      }
      content: unknown[]
    }
    currentEpisode: number
    hiddenEpisodeNumbers: boolean
    requiresAdultVerification: boolean
    requiresPin: boolean
    requiresPreReleasePin: boolean
    seasons: {
      year: number
      shortName: string
      longName: string
      hiddenEpisodeNumbers: boolean
      title: string
      id: number
      seq: number
      episodes: {
        start: number
        end: number
        synopsis: string
        episodeId: number
        liveEvent: {
          hasLiveEvent: boolean
        }
        taglineMessages: {
          tagline: string
          classification: string
        }
        requiresAdultVerification: boolean
        requiresPin: boolean
        requiresPreReleasePin: boolean
        creditsOffset: number
        runtime: number
        displayRuntime: number
        watchedToEndOffset: number
        autoplayable: boolean
        title: string
        id: number
        bookmark: {
          watchedDate: number
          offset: number
        }
        skipMarkers: {
          credit: {
            start: number
            end: number
          }
          recap: {
            start: number
            end: number
          }
          content: unknown[]
        }
        hd: boolean
        thumbs: {
          w: number
          h: number
          url: string
        }[]
        stills: {
          w: number
          h: number
          url: string
        }[]
        seq: number
        hiddenEpisodeNumbers: boolean
      }[]
    }[]
    merchedVideoId: unknown
    cinematch: {
      type: string
      value: string
    }
  }
}
