import type { ErrorResponse } from './graphql'

export type AniListViewer = {
  data: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Viewer: {
      id: number
    }
  }
}

export async function fetchAniListViewer(token: string): Promise<AniListViewer | ErrorResponse> {
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    body: JSON.stringify({
      query: `
        query {
          Viewer {
            id
          }
        }
      `,
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
  return response.json()
}

export type AniListFollowingsResponse = {
  data: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Page: {
      followers: {
        id: number
      }[]
      pageInfo: {
        hasNextPage: boolean
      }
    }
  }
}

async function fetchAniListFollowings(
  userId: number,
  page: number,
  token: string
): Promise<AniListFollowingsResponse | ErrorResponse> {
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    body: JSON.stringify({
      query: `
        query($userId: Int!, $page: Int!) {
          Page(page: $page, perPage: 50) {
            followers(userId: $userId) {
              id
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      `,
      variables: {
        userId,
        page,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
  return response.json()
}

export async function fetchPaginatedAniListFollowings(
  userId: number,
  token: string
): Promise<AniListFollowingsResponse[] | ErrorResponse> {
  const results: AniListFollowingsResponse[] = []
  let page = 1

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const response: AniListFollowingsResponse | ErrorResponse = await fetchAniListFollowings(userId, page, token)
    if ('errors' in response) {
      return response
    }

    results.push(response)

    if (!response.data.Page.pageInfo.hasNextPage) {
      break
    }
    page++
  }

  return results
}

export type AniListFollowingStatusesResponse = {
  data: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Page: {
      mediaList: {
        user: {
          name: string
          avatar: {
            large: string
          }
        }
        status: 'CURRENT' | 'PLANNING' | 'COMPLETED' | 'DROPPED' | 'PAUSED' | 'REPEATING'
        score: number
      }[]
      pageInfo: {
        hasNextPage: boolean
      }
    }
  }
}

async function fetchAniListFollowingStatuses(
  mediaId: number,
  userIds: number[],
  page: number,
  token: string
): Promise<AniListFollowingStatusesResponse | ErrorResponse> {
  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    body: JSON.stringify({
      query: `
        query($mediaId: Int!, $userIds: [Int!]!, $page: Int!) {
          Page(page: $page, perPage: 50) {
            mediaList(type: ANIME, mediaId: $mediaId, userId_in: $userIds) {
              user {
                name
                avatar {
                  large
                }
              }
              status
              score
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      `,
      variables: {
        mediaId,
        userIds,
        page,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
  return response.json()
}

export async function fetchPaginatedAniListFollowingStatuses(
  mediaId: number,
  userIds: number[],
  token: string
): Promise<AniListFollowingStatusesResponse[] | ErrorResponse> {
  const results: AniListFollowingStatusesResponse[] = []
  let page = 1

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const response: AniListFollowingStatusesResponse | ErrorResponse = await fetchAniListFollowingStatuses(
      mediaId,
      userIds,
      page,
      token
    )
    if ('errors' in response) {
      return response
    }

    results.push(response)

    if (!response.data.Page.pageInfo.hasNextPage) {
      break
    }
    page++
  }

  return results
}
