import type { ErrorResponse } from './graphql'

export type AnnictFollowingStatusesResponse = {
  data: {
    viewer: {
      following: {
        nodes: {
          name: string
          username: string
          avatarUrl: string
          watched: {
            nodes: {
              annictId: number
            }[]
          }
          watching: {
            nodes: {
              annictId: number
            }[]
          }
          stopWatching: {
            nodes: {
              annictId: number
            }[]
          }
          onHold: {
            nodes: {
              annictId: number
            }[]
          }
          wannaWatch: {
            nodes: {
              annictId: number
            }[]
          }
        }[]
        pageInfo: {
          hasNextPage: boolean
          endCursor: string
        }
      }
    }
  }
}

async function fetchAnnictFollowingStatuses(
  workId: number,
  cursor: string | null,
  token: string
): Promise<AnnictFollowingStatusesResponse | ErrorResponse> {
  const response = await fetch('https://api.annict.com/graphql', {
    method: 'POST',
    body: JSON.stringify({
      /*
       * libraryEntries に annictId で引ける引数がないので works を個別に叩いている...
       * ↓ 本当はこう叩きたい
       * libraryEntries(annictIds: [$workId]) {
       *   nodes {
       *     status {
       *       state
       *     }
       *   }
       * }
       */
      query: `
        query($workId: Int!, $cursor: String) {
          viewer {
            following(after: $cursor) {
              nodes {
                name
                username
                avatarUrl
                watched: works(annictIds: [$workId], state: WATCHED) {
                  nodes {
                    annictId
                  }
                }
                watching: works(annictIds: [$workId], state: WATCHING) {
                  nodes {
                    annictId
                  }
                }
                stopWatching: works(annictIds: [$workId], state: STOP_WATCHING) {
                  nodes {
                    annictId
                  }
                }
                onHold: works(annictIds: [$workId], state: ON_HOLD) {
                  nodes {
                    annictId
                  }
                }
                wannaWatch: works(annictIds: [$workId], state: WANNA_WATCH) {
                  nodes {
                    annictId
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }
      `,
      variables: {
        workId,
        cursor,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
  return response.json()
}

export async function fetchPaginatedAnnictFollowingStatuses(
  workId: number,
  token: string
): Promise<AnnictFollowingStatusesResponse[] | ErrorResponse> {
  const results: AnnictFollowingStatusesResponse[] = []
  let cursor: string | null = null

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const response: AnnictFollowingStatusesResponse | ErrorResponse = await fetchAnnictFollowingStatuses(
      workId,
      cursor,
      token
    )
    if ('errors' in response) {
      return response
    }

    results.push(response)

    if (!response.data.viewer.following.pageInfo.hasNextPage) {
      break
    }
    cursor = response.data.viewer.following.pageInfo.endCursor
  }

  return results
}
