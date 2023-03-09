import { executeXhr } from '../lib/api'
import { GM_Value } from '../lib/GM_Value'

const annictTokenKey = 'annict_token'

const style = document.createElement('style')
document.head.appendChild(style)

GM_config.init({
  id: 'annict_following_viewings',
  title: 'Annict Following Viewings 設定',
  fields: {
    [annictTokenKey]: {
      label: 'Annict 個人用アクセストークン',
      type: 'text',
      default: '',
    },
  },
  events: {
    open() {
      style.textContent = `
        .l-default {
          filter: blur(10px);
        }
        iframe#annict_following_viewings {
          border: 0 !important;
          border-radius: 20px;
          height: 30% !important;
          width: 50% !important;
          left: 25% !important;
          top: 33% !important;
          opacity: 0.9 !important;
        }
      `
    },
    close() {
      style.textContent = ''
    },
    save() {
      window.location.reload()
    },
  },
  css: `
    body {
      background: #33363a !important;
      color: #e9ecef !important;
      -webkit-font-smoothing: antialiased !important;
      text-rendering: optimizeSpeed !important;
    }
    .config_header {
      font-weight: 700 !important;
      font-size: 1.75rem !important;
      padding: 1em !important;
    }
    .config_var {
      padding: 2em !important;
    }
    .field_label {
      font-weight: normal !important;
      font-size: 1.2rem !important;
    }
    input {
      background-color: #212529 !important;
      color: #e9ecef;
      display: block;
      width: 100%;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      background-clip: padding-box;
      border: 1px solid #495057;
      appearance: none;
      border-radius: 0.3rem;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
    div:has(> .saveclose_buttons) {
      text-align: center !important;
    }
    .saveclose_buttons {
      box-sizing: border-box;
      display: inline-block;
      font-weight: 400;
      line-height: 1.5;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
      border: 1px solid transparent;
      padding: 0.375rem 0.75rem !important;
      font-size: 1rem;
      border-radius: 50rem;
      transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
      color: #fff;
      background-color: #d51c5b;
      border-color: #d51c5b;
      -webkit-appearance: button;
    }
    .reset {
      color: #e9ecef !important;
    }
  `,
})

const migrate = () => {
  // もう使わないので設定を移行する
  const annictTokenRef = new GM_Value<string | undefined>('ANNICT_TOKEN')
  const annictToken = annictTokenRef.pop()
  if (annictToken !== undefined) {
    GM_config.set(annictTokenKey, annictToken)
  }
}

type FollowingStatusesResponse = {
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

type ErrorResponse = {
  errors: {
    message: string
  }[]
}

const fetchFollowingStatuses = async (
  workId: number,
  cursor: string | null,
  token: string
): Promise<FollowingStatusesResponse | ErrorResponse> => {
  const response = await executeXhr({
    url: 'https://api.annict.com/graphql',
    method: 'POST',
    data: JSON.stringify({
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
  return JSON.parse(response.responseText)
}

const fetchPaginatedFollowingStatuses = async (
  workId: number,
  token: string
): Promise<FollowingStatusesResponse[] | ErrorResponse> => {
  const results: FollowingStatusesResponse[] = []
  let cursor: string | null = null

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition,no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    const response: FollowingStatusesResponse | ErrorResponse = await fetchFollowingStatuses(workId, cursor, token)
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

type FollowingState = {
  name: string
  username: string
  avatarUrl: string
  label: string
  iconClasses: string[]
  iconColor: string
}

const parseFollowingStatuses = (response: FollowingStatusesResponse): FollowingState[] =>
  response.data.viewer.following.nodes
    .map((u) => {
      let label: string
      let iconClasses: string[]
      let iconColor: string
      if (u.watched.nodes.length > 0) {
        label = '見た'
        iconClasses = ['far', 'fa-check']
        iconColor = '--ann-status-completed-color'
      } else if (u.watching.nodes.length > 0) {
        label = '見てる'
        iconClasses = ['far', 'fa-play']
        iconColor = '--ann-status-watching-color'
      } else if (u.stopWatching.nodes.length > 0) {
        label = '視聴停止'
        iconClasses = ['far', 'fa-stop']
        iconColor = '--ann-status-dropped-color'
      } else if (u.onHold.nodes.length > 0) {
        label = '一時中断'
        iconClasses = ['far', 'fa-pause']
        iconColor = '--ann-status-on-hold-color'
      } else if (u.wannaWatch.nodes.length > 0) {
        label = '見たい'
        iconClasses = ['far', 'fa-circle']
        iconColor = '--ann-status-plan-to-watch-color'
      } else {
        return null
      }

      return {
        name: u.name,
        username: u.username,
        avatarUrl: u.avatarUrl,
        label,
        iconClasses,
        iconColor,
      }
    })
    .filter((x): x is Exclude<typeof x, null> => !!x)

const annictWorkPageUrlPattern = /^https:\/\/annict\.com\/works\/(\d+)/

const renderSectionTitle = (): HTMLElement => {
  const title = document.createElement('div')
  title.classList.add('container', 'mt-5')
  {
    const div = document.createElement('div')
    div.classList.add('d-flex', 'justify-content-between')
    title.appendChild(div)
  }
  {
    const h2 = document.createElement('h2')
    h2.classList.add('fw-bold', 'h3', 'mb-3')
    h2.textContent = 'フォロー中のユーザーの視聴状況'
    title.appendChild(h2)
  }

  return title
}

const renderSectionBody = (): [HTMLElement, HTMLElement] => {
  const body = document.createElement('div')
  body.classList.add('container', 'u-container-flat')
  {
    const card = document.createElement('div')
    card.classList.add('card', 'u-card-flat')
    body.appendChild(card)
    {
      const cardBody = document.createElement('div')
      cardBody.classList.add('card-body')
      cardBody.textContent = '読み込み中...'
      card.appendChild(cardBody)
      return [body, cardBody]
    }
  }
}

const renderSectionBodyContent = (statuses: FollowingState[]): HTMLElement => {
  const row = document.createElement('div')
  row.classList.add('row', 'g-3')

  for (const status of statuses) {
    const col = document.createElement('div')
    col.classList.add('col-6', 'col-sm-3')
    col.style.display = 'flex'
    row.appendChild(col)
    {
      const avatarCol = document.createElement('div')
      avatarCol.classList.add('col-auto', 'pe-0')
      col.appendChild(avatarCol)
      {
        const a = document.createElement('a')
        a.href = `/@${status.username}`
        avatarCol.appendChild(a)
        {
          const img = document.createElement('img')
          img.classList.add('img-thumbnail', 'rounded-circle')
          img.style.width = '50px'
          img.style.height = '50px'
          img.style.marginRight = '1em'
          img.src = status.avatarUrl
          a.appendChild(img)
        }
      }

      const userCol = document.createElement('div')
      userCol.classList.add('col')
      col.appendChild(userCol)
      {
        const div1 = document.createElement('div')
        userCol.appendChild(div1)
        {
          const a = document.createElement('a')
          a.classList.add('fw-bold', 'me-1', 'text-body')
          a.href = `/@${status.username}`
          div1.appendChild(a)
          {
            const span = document.createElement('span')
            span.classList.add('me-1')
            span.textContent = status.name
            a.appendChild(span)
          }
          {
            const small = document.createElement('small')
            small.style.marginRight = '1em'
            small.classList.add('text-muted')
            small.textContent = `@${status.username}`
            a.appendChild(small)
          }
        }

        const div2 = document.createElement('div')
        div2.classList.add('small', 'text-body')
        userCol.appendChild(div2)
        {
          const i = document.createElement('i')
          i.classList.add(...status.iconClasses)
          i.style.color = `var(${status.iconColor})`
          div2.appendChild(i)
        }
        {
          const small = document.createElement('small')
          small.style.marginLeft = '5px'
          small.textContent = status.label
          div2.appendChild(small)
        }
      }
    }
  }

  return row
}

const handle = async () => {
  const match = annictWorkPageUrlPattern.exec(window.location.href)
  if (!match) {
    return
  }

  const workId = parseInt(match[1], 10)
  if (!workId) {
    throw new Error('failed to extract Annict work ID')
  }

  const header = document.querySelector('.c-work-header')
  if (header === null) {
    throw new Error('failed to find .c-work-header')
  }

  const title = renderSectionTitle()
  header.insertAdjacentElement('afterend', title)

  const [body, card] = renderSectionBody()
  title.insertAdjacentElement('afterend', body)

  const token = GM_config.get(annictTokenKey)
  if (typeof token !== 'string' || token.length === 0) {
    const guideAnchor = document.createElement('a')
    guideAnchor.href =
      'https://scrapbox.io/slashnephy/Annict_%E3%81%AE%E4%BD%9C%E5%93%81%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E3%83%95%E3%82%A9%E3%83%AD%E3%83%BC%E4%B8%AD%E3%81%AE%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AE%E8%A6%96%E8%81%B4%E7%8A%B6%E6%B3%81%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript'
    guideAnchor.textContent = 'ガイド'
    guideAnchor.target = '_blank'

    const settingsAnchor = document.createElement('a')
    settingsAnchor.href = 'about:blank'
    settingsAnchor.textContent = 'こちら'
    settingsAnchor.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      GM_config.open()
    })

    card.textContent = ''
    card.append(
      'Annict Following Viewings の動作には Annict の個人用アクセストークンの設定が必要です。',
      guideAnchor,
      'を参考に',
      settingsAnchor,
      'から設定を行ってください。'
    )
    return
  }

  const responses = await fetchPaginatedFollowingStatuses(workId, token)
  if ('errors' in responses) {
    const error = responses.errors.map(({ message }) => message).join('\n')
    card.textContent = ''
    card.append(`Annict GraphQL API がエラーを返しました。\n${error}`)
    return
  }

  const statuses = responses.map((r) => parseFollowingStatuses(r)).flat()
  if (statuses.length > 0) {
    const content = renderSectionBodyContent(statuses)
    card.textContent = ''
    card.appendChild(content)
    return
  }

  card.textContent = 'フォロー中のユーザーの視聴状況はありません。'
}

migrate()

document.addEventListener('turbo:load', () => {
  handle().catch(console.error)
})
