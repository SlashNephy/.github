// ==UserScript==
// @name            Annict Following Viewings
// @namespace       https://github.com/SlashNephy
// @version         0.1.0
// @author          SlashNephy
// @description     Display following viewings on Annict work page.
// @description:ja  Annictの作品ページにフォロー中のユーザーの視聴状況を表示します。
// @homepage        https://scrapbox.io/slashnephy
// @homepageURL     https://scrapbox.io/slashnephy
// @icon            https://www.google.com/s2/favicons?sz=64&domain=annict.com
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/annict-following-viewings.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/annict-following-viewings.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://annict.com/*
// @connect         api.annict.com
// @grant           GM_xmlhttpRequest
// @grant           GM_getValue
// @grant           GM_setValue
// @license         MIT license
// ==/UserScript==

const executeXhr = async (request) =>
  new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      ...request,
      onload: (response) => {
        resolve(response)
      },
      onerror: (error) => {
        reject(error)
      },
    })
  })

class GM_Value {
  key

  defaultValue

  constructor(key, defaultValue, initialize = true) {
    this.key = key
    this.defaultValue = defaultValue
    const value = GM_getValue(key, null)
    if (initialize && value === null) {
      GM_setValue(key, defaultValue)
    }
  }

  get() {
    return GM_getValue(this.key, this.defaultValue)
  }

  set(value) {
    GM_setValue(this.key, value)
  }

  delete() {
    GM_deleteValue(this.key)
  }
}

const annictTokenRef = new GM_Value('ANNICT_TOKEN')
const fetchFollowingStatuses = async (workId, token) => {
  const response = await executeXhr({
    url: 'https://api.annict.com/graphql',
    method: 'POST',
    data: JSON.stringify({
      query: `
        query($workId: Int!) {
          viewer {
            following {
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
      },
    }),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
  return JSON.parse(response.responseText)
}
const parseFollowingStatuses = (response) =>
  response.data.viewer.following.nodes
    .map((u) => {
      let label
      let iconClasses
      if (u.watched.nodes.length > 0) {
        label = '見た'
        iconClasses = ['far', 'fa-check']
      } else if (u.watching.nodes.length > 0) {
        label = '見てる'
        iconClasses = ['far', 'fa-play']
      } else if (u.stopWatching.nodes.length > 0) {
        label = '視聴停止'
        iconClasses = ['far', 'fa-stop']
      } else if (u.onHold.nodes.length > 0) {
        label = '一時中断'
        iconClasses = ['far', 'fa-pause']
      } else if (u.wannaWatch.nodes.length > 0) {
        label = '見たい'
        iconClasses = ['far', 'fa-circle']
      } else {
        return null
      }
      return {
        name: u.name,
        username: u.username,
        avatarUrl: u.avatarUrl,
        label,
        iconClasses,
      }
    })
    .filter((x) => !!x)
const annictWorkPageUrlPattern = /^https:\/\/annict\.com\/works\/(\d+)/
const renderSectionTitle = () => {
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
const renderSectionBody = () => {
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
const renderSectionBodyContent = (statuses) => {
  const row = document.createElement('div')
  row.classList.add('row', 'g-3')
  for (const status of statuses) {
    const avatarCol = document.createElement('div')
    avatarCol.classList.add('col-auto', 'pe-0')
    row.appendChild(avatarCol)
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
    row.appendChild(userCol)
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
  const token = annictTokenRef.get()
  if (token === undefined) {
    const guideAnchor = document.createElement('a')
    guideAnchor.href =
      'https://scrapbox.io/slashnephy/Annict_%E3%81%AE%E4%BD%9C%E5%93%81%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E3%83%95%E3%82%A9%E3%83%AD%E3%83%BC%E4%B8%AD%E3%81%AE%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AE%E8%A6%96%E8%81%B4%E7%8A%B6%E6%B3%81%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript'
    guideAnchor.textContent = 'ガイド'
    guideAnchor.target = '_blank'
    card.textContent = ''
    card.append(
      'この UserScript の動作には Annict の個人用アクセストークンの設定が必要です。こちらの',
      guideAnchor,
      'を参考に設定を行ってください。'
    )
    return
  }
  const response = await fetchFollowingStatuses(workId, token)
  if ('errors' in response) {
    const error = response.errors.map(({ message }) => message).join('\n')
    card.textContent = ''
    card.append(`Annict GraphQL API がエラーを返しました。\n${error}`)
    return
  }
  const statuses = parseFollowingStatuses(response)
  const content = renderSectionBodyContent(statuses)
  card.textContent = ''
  card.appendChild(content)
}
document.addEventListener('turbo:load', () => {
  handle().catch(console.error)
})
