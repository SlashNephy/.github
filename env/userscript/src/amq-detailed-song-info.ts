import { addScriptData, addStyle } from '../lib/thirdparty/amqScriptInfo'

import type { AnswerResultsEvent } from '../types/amq'

type CustomRow = {
  id: string
  title: string
  content(payload: AnswerResultsEvent): string
}

type EvaluatedCustomRow = Omit<CustomRow, 'id' | 'content'> & { content: string }

const rows: CustomRow[] = [
  {
    id: 'difficulty-row',
    title: 'Difficulty',
    content(payload: AnswerResultsEvent): string {
      return `${payload.songInfo.animeDifficulty.toFixed(1)} / 100`
    },
  },
  {
    id: 'vintage-row',
    title: 'Vintage',
    content(payload: AnswerResultsEvent): string {
      return payload.songInfo.vintage
    },
  },
  {
    id: 'format-row',
    title: 'Format',
    content(payload: AnswerResultsEvent): string {
      return payload.songInfo.animeType
    },
  },
  {
    id: 'rating-row',
    title: 'Rating',
    content(payload: AnswerResultsEvent): string {
      return `${payload.songInfo.animeScore.toFixed(2)} / 10`
    },
  },
]

type CustomLink = {
  id: string
  title: string
  target?: string
  href(payload: AnswerResultsEvent): string
}

type EvaluatedCustomLink = Omit<CustomLink, 'id' | 'href'> & { href: string }

const links: CustomLink[] = [
  {
    id: 'spotify-link',
    title: 'Spotify',
    href(payload: AnswerResultsEvent): string {
      return `spotify://search/${encodeURIComponent(payload.songInfo.songName)}%20${encodeURIComponent(
        payload.songInfo.artist
      )}/tracks`
    },
  },
  {
    id: 'youtube-link',
    title: 'YouTube',
    href(payload: AnswerResultsEvent): string {
      return `https://www.youtube.com/results?search_query=${encodeURIComponent(
        payload.songInfo.songName
      )}+${encodeURIComponent(payload.songInfo.artist)}`
    },
  },
]

const handle = (event: AnswerResultsEvent) => {
  const container = document.querySelector('#qpAnimeContainer div.qpSideContainer:not([id])')
  if (!container) {
    throw new Error('container is not found.')
  }

  // CustomRow
  for (const row of rows) {
    const element = getOrCreateRow(container, row.id)

    // 既に row が挿入されていれば、textContent の更新だけ行う
    const contentElement = element.querySelector('.row-content')
    if (contentElement !== null) {
      contentElement.textContent = row.content(event)
    } else {
      renderRow(element, {
        ...row,
        content: row.content(event),
      })
    }
  }

  // CustomLink
  const element = getOrCreateLinkContainer(container, 'link-container')
  renderLinks(
    element,
    links.map((link) => {
      return {
        ...link,
        href: link.href(event),
      }
    })
  )
}

const getOrCreateRow = (container: Element, id: string) => {
  const existing = document.getElementById(id)
  if (existing !== null) {
    return existing
  }

  const element = document.createElement('div')
  element.id = id

  const hider = container.querySelector<HTMLDivElement>('div#qpInfoHider')
  if (hider === null) {
    throw new Error('div#qpInfoHider is not found.')
  }

  if (!hider.classList.contains('custom-hider')) {
    hider.classList.add('custom-hider')
  }

  container.insertBefore(element, hider.previousElementSibling)

  return element
}

const renderRow = (element: HTMLElement, row: EvaluatedCustomRow) => {
  const h5 = document.createElement('h5')
  const b = document.createElement('b')
  const p = document.createElement('p')
  h5.append(b)
  element.append(h5)
  element.append(p)

  element.classList.add('row')
  p.classList.add('row-content')
  b.textContent = row.title
  p.textContent = row.content
}

const getOrCreateLinkContainer = (container: Element, id: string) => {
  const existing = document.getElementById(id)
  if (existing !== null) {
    while (existing.lastElementChild !== null) {
      existing.removeChild(existing.lastElementChild)
    }

    return existing
  }

  const element = document.createElement('div')
  element.id = id

  const hider = container.querySelector<HTMLDivElement>('div#qpInfoHider')
  if (hider === null) {
    throw new Error('div#qpInfoHider is not found.')
  }

  if (!hider.classList.contains('custom-hider')) {
    hider.classList.add('custom-hider')
  }

  container.insertBefore(element, hider)

  return element
}

const renderLinks = (element: HTMLElement, links: EvaluatedCustomLink[]) => {
  const b = document.createElement('b')
  element.append(b)

  const lastIndex = links.length - 1
  for (const [index, link] of links.entries()) {
    const a = document.createElement('a')
    b.append(a)

    a.href = link.href
    a.textContent = link.title
    if (link.target !== undefined) {
      a.target = link.target
    }

    // 最後じゃなければハイフンを挿入
    if (index !== lastIndex) {
      b.append(' - ')
    }
  }
}

if (unsafeWindow.Listener !== undefined) {
  const listener = new unsafeWindow.Listener('answer results', handle)
  listener.bindListener()
}

addScriptData({
  name: 'Detailed Song Info',
  author: 'SlashNephy &lt;spica@starry.blue&gt;',
  description: 'Display detailed information on the side panel of the song.',
})

addStyle(`
.custom-hider {
  padding: 50% 0;
}
`)
