import { hasMinLength } from 'ts-array-length'

import {
  fetchAniListViewer,
  fetchPaginatedAniListFollowings,
  fetchPaginatedAniListFollowingStatuses,
} from '../lib/external/anilist'
import { fetchPaginatedAnnictFollowingStatuses } from '../lib/external/annict'
import { fetchArmEntries } from '../lib/external/arm'
import { GM_Value } from '../lib/tampermonkey/GM_Value'

import type { AniListFollowingStatusesResponse } from '../lib/external/anilist'
import type { AnnictFollowingStatusesResponse } from '../lib/external/annict'

const annictTokenKey = 'annict_token'
const anilistTokenKey = 'anilist_token'
const anilistCallbackKey = 'anilist_callback'
const anilistClientId = '12566'

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
    [anilistTokenKey]: {
      label: 'AniList アクセストークン',
      type: 'text',
      default: '',
    },
    anilistAuthorizeLabel: {
      type: 'label',
    },
    [anilistCallbackKey]: {
      type: 'hidden',
    },
  },
  types: {
    label: {
      default: null,
      toNode(): HTMLElement {
        const anchor = document.createElement('a')
        anchor.classList.add('authorize')
        anchor.href = `https://anilist.co/api/v2/oauth/authorize?client_id=${anilistClientId}&response_type=token`
        anchor.textContent = 'AniList と連携する'
        anchor.target = '_top'
        anchor.addEventListener('click', () => {
          GM_config.set(anilistCallbackKey, window.location.href)
          GM_config.write()
        })
        return anchor
      },
      toValue(): FieldValue | null {
        return null
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      reset() {},
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
          height: 40% !important;
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
    a.authorize {
      color: #7ca1f3;
      text-decoration: none;
      padding-left: 2em;
    }
    div#annict_following_viewings_anilist_callback_var {
      display: none;
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

type FollowingState = {
  name: string
  service: 'annict' | 'anilist'
  username: string
  avatarUrl: string
  label: string
  iconClasses: string[]
  iconColor: string
}

const parseAnnictFollowingStatuses = (response: AnnictFollowingStatusesResponse): FollowingState[] =>
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
        service: 'annict' as const,
        username: u.username,
        avatarUrl: u.avatarUrl,
        label,
        iconClasses,
        iconColor,
      }
    })
    .filter((x): x is Exclude<typeof x, null> => !!x)

const parseAniListFollowingStatuses = (response: AniListFollowingStatusesResponse): FollowingState[] =>
  response.data.Page.mediaList.map((u) => {
    let label: string
    let iconClasses: string[]
    let iconColor: string
    switch (u.status) {
      case 'CURRENT':
        label = '見てる'
        iconClasses = ['far', 'fa-play']
        iconColor = '--ann-status-watching-color'
        break
      case 'PLANNING':
        label = '見たい'
        iconClasses = ['far', 'fa-circle']
        iconColor = '--ann-status-plan-to-watch-color'
        break
      case 'COMPLETED':
        label = '見た'
        iconClasses = ['far', 'fa-check']
        iconColor = '--ann-status-completed-color'
        break
      case 'DROPPED':
        label = '視聴停止'
        iconClasses = ['far', 'fa-stop']
        iconColor = '--ann-status-dropped-color'
        break
      case 'PAUSED':
        label = '一時中断'
        iconClasses = ['far', 'fa-pause']
        iconColor = '--ann-status-on-hold-color'
        break
      case 'REPEATING':
        label = 'リピート中'
        iconClasses = ['far', 'fa-forward']
        iconColor = '--ann-status-watching-color'
        break
    }

    return {
      name: u.user.name,
      service: 'anilist' as const,
      username: u.user.name,
      avatarUrl: u.user.avatar.large,
      label: u.score > 0 ? `${label} (${u.score} / 10)` : label,
      iconClasses,
      iconColor,
    }
  })

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

const renderSectionBody = (): [HTMLElement, HTMLElement, HTMLDivElement] => {
  const body = document.createElement('div')
  body.classList.add('container', 'u-container-flat')
  {
    const card = document.createElement('div')
    card.classList.add('card', 'u-card-flat')
    body.appendChild(card)
    {
      const cardBody = document.createElement('div')
      {
        cardBody.classList.add('card-body')

        const loading = document.createElement('div')
        loading.classList.add('loading')
        loading.textContent = '読み込み中...'
        cardBody.appendChild(loading)
      }

      const row = document.createElement('div')
      row.classList.add('row', 'g-3')
      cardBody.appendChild(row)

      card.appendChild(cardBody)
      return [body, cardBody, row]
    }
  }
}

const renderSectionBodyContent = (row: HTMLDivElement, statuses: FollowingState[]) => {
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
        if (status.service === 'annict') {
          a.href = `/@${status.username}`
        } else {
          a.href = `https://anilist.co/user/${status.username}`
          a.target = '_blank'
        }
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
          if (status.service === 'annict') {
            a.href = `/@${status.username}`
          } else {
            a.href = `https://anilist.co/user/${status.username}`
            a.target = '_blank'
          }
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
            if (status.service === 'annict') {
              small.textContent = `@${status.username}`
            }
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
}

const handle = async () => {
  if (window.location.pathname === '/') {
    const hash = new URLSearchParams(
      window.location.hash.substring(1) // skip the leading '#'
    )
    const token = hash.get('access_token')
    if (token !== null) {
      GM_config.set(anilistTokenKey, token)
      window.location.hash = ''

      alert('[Annict Following Viewings] AniList と接続しました。')

      const callback = GM_config.get(anilistCallbackKey)
      GM_config.set(anilistCallbackKey, '')
      GM_config.write()

      if (typeof callback === 'string' && callback.length > 0) {
        // eslint-disable-next-line xss/no-location-href-assign
        window.location.href = callback
      }
    }

    return
  }

  const workMatch = annictWorkPageUrlPattern.exec(window.location.href)
  if (!workMatch || !hasMinLength(workMatch, 2)) {
    return
  }

  const annictWorkId = parseInt(workMatch[1], 10)
  if (!annictWorkId) {
    throw new Error('failed to extract Annict work ID')
  }

  const header = document.querySelector('.c-work-header')
  if (header === null) {
    throw new Error('failed to find .c-work-header')
  }

  const title = renderSectionTitle()
  header.insertAdjacentElement('afterend', title)

  const [body, card, row] = renderSectionBody()
  title.insertAdjacentElement('afterend', body)

  const settingsAnchor = document.createElement('a')
  settingsAnchor.href = 'about:blank'
  settingsAnchor.textContent = '設定'
  settingsAnchor.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    GM_config.open()
  })

  const annictToken = GM_config.get(annictTokenKey)
  const anilistToken = GM_config.get(anilistTokenKey)
  if (!annictToken && !anilistToken) {
    const guideAnchor = document.createElement('a')
    guideAnchor.href =
      'https://scrapbox.io/slashnephy/Annict_%E3%81%AE%E4%BD%9C%E5%93%81%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E3%83%95%E3%82%A9%E3%83%AD%E3%83%BC%E4%B8%AD%E3%81%AE%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AE%E8%A6%96%E8%81%B4%E7%8A%B6%E6%B3%81%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript'
    guideAnchor.textContent = 'ガイド'
    guideAnchor.target = '_blank'

    card.textContent = ''
    card.append(
      'Annict Following Viewings の動作にはアクセストークンの設定が必要です。',
      guideAnchor,
      'を参考に',
      settingsAnchor,
      'を行ってください。'
    )
    return
  }

  card.append(document.createElement('br'), settingsAnchor)

  const promises: Promise<void>[] = []
  if (typeof annictToken === 'string' && annictToken.length > 0) {
    promises.push(insertAnnictFollowingStatuses(annictWorkId, annictToken, card, row))
  }

  if (typeof anilistToken === 'string' && anilistToken.length > 0) {
    promises.push(insertAniListFollowingStatuses(annictWorkId, anilistToken, card, row))
  }

  await Promise.all(promises)

  if (row.children.length === 0) {
    card.append('フォロー中のユーザーの視聴状況はありません。')
  }
}

const insertAnnictFollowingStatuses = async (
  annictWorkId: number,
  annictToken: string,
  card: HTMLElement,
  row: HTMLDivElement
) => {
  const responses = await fetchPaginatedAnnictFollowingStatuses(annictWorkId, annictToken)
  card.querySelector('.loading')?.remove()

  if ('errors' in responses) {
    const error = responses.errors.map(({ message }) => message).join('\n')
    card.append(`Annict GraphQL API がエラーを返しました。\n${error}`)
    return
  }

  const statuses = responses.map((r) => parseAnnictFollowingStatuses(r)).flat()
  if (statuses.length > 0) {
    renderSectionBodyContent(row, statuses)
  }
}

const insertAniListFollowingStatuses = async (
  annictWorkId: number,
  anilistToken: string,
  card: HTMLElement,
  row: HTMLDivElement
) => {
  const armEntries = await fetchArmEntries()
  const mediaId = armEntries.find((x) => x.annict_id === annictWorkId)?.anilist_id
  if (!mediaId) {
    return
  }

  const viewerResponse = await fetchAniListViewer(anilistToken)
  card.querySelector('.loading')?.remove()

  if ('errors' in viewerResponse) {
    const error = viewerResponse.errors.map(({ message }) => message).join('\n')
    card.append(`AniList GraphQL API がエラーを返しました。\n${error}`)
    return
  }

  const followingsResponses = await fetchPaginatedAniListFollowings(viewerResponse.data.Viewer.id, anilistToken)
  if ('errors' in followingsResponses) {
    const error = followingsResponses.errors.map(({ message }) => message).join('\n')
    card.append(`AniList GraphQL API がエラーを返しました。\n${error}`)
    return
  }

  const followings = followingsResponses.map((r) => r.data.Page.followers.map((f) => f.id)).flat()
  const responses = await fetchPaginatedAniListFollowingStatuses(mediaId, followings, anilistToken)
  if ('errors' in responses) {
    const error = responses.errors.map(({ message }) => message).join('\n')
    card.append(`AniList GraphQL API がエラーを返しました。\n${error}`)
    return
  }

  const statuses = responses.map((r) => parseAniListFollowingStatuses(r)).flat()
  if (statuses.length > 0) {
    renderSectionBodyContent(row, statuses)
  }
}

migrate()

document.addEventListener('turbo:load', () => {
  handle().catch(console.error)
})
