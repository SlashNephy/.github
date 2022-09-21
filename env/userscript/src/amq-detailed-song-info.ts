import { addScriptData, addStyle } from '../lib/thirdparty/amqScriptInfo'

import type { AnswerResultsEvent } from '../types/amq'
import type { CustomLink, CustomRow } from '../types/amq-detailed-song-info'

type EvaluatedCustomRow = Omit<CustomRow, 'id' | 'content'> & { readonly content: string }
type EvaluatedCustomLink = Omit<CustomLink, 'id' | 'href'> & { readonly href: string }

const rows: CustomRow[] = [
  {
    id: 'difficulty-row',
    title: 'Difficulty',
    content(event: AnswerResultsEvent): string {
      return `${event.songInfo.animeDifficulty.toFixed(1)} / 100`
    },
  },
  {
    id: 'vintage-row',
    title: 'Vintage',
    content(event: AnswerResultsEvent): string {
      return event.songInfo.vintage
    },
  },
  {
    id: 'format-row',
    title: 'Format',
    content(event: AnswerResultsEvent): string {
      return event.songInfo.animeType
    },
  },
  {
    id: 'rating-row',
    title: 'Rating',
    content(event: AnswerResultsEvent): string {
      return `${event.songInfo.animeScore.toFixed(2)} / 10`
    },
  },
]

const links: CustomLink[] = [
  {
    id: 'spotify-link',
    title: 'Spotify',
    target: '_blank',
    href(event: AnswerResultsEvent): string {
      return `spotify://search/${encodeURIComponent(event.songInfo.songName)}%20${encodeURIComponent(
        event.songInfo.artist
      )}/tracks`
    },
  },
  {
    id: 'youtube-link',
    title: 'YouTube',
    target: '_blank',
    href(event: AnswerResultsEvent): string {
      return `https://www.youtube.com/results?search_query=${encodeURIComponent(
        event.songInfo.songName
      )}+${encodeURIComponent(event.songInfo.artist)}`
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
      const content = row.content(event)
      if (content === null) {
        continue
      }

      renderRow(element, {
        ...row,
        content,
      })
    }
  }

  // CustomLink
  const element = getOrCreateLinkContainer(container, 'link-container')
  renderLinks(
    element,
    links
      .map((link) => {
        const href = link.href(event)
        if (href === null) {
          return null
        }

        return {
          ...link,
          href,
        }
      })
      .filter((x): x is Exclude<typeof x, null> => x !== null)
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

if (unsafeWindow.detailedSongInfo === undefined) {
  unsafeWindow.detailedSongInfo = {
    register(item: CustomRow | CustomLink) {
      const container = 'content' in item ? rows : links
      if (container.some((x) => x.id === item.id)) {
        return
      }

      container.push(item as unknown as CustomRow & CustomLink)
    },
    unregister(item: CustomRow | CustomLink) {
      const container = 'content' in item ? rows : links
      const index = container.findIndex((x) => x.id === item.id)
      if (index >= 0) {
        container.splice(index, 1)
      }
    },
    get rows(): CustomRow[] {
      return rows
    },
    get links(): CustomLink[] {
      return links
    },
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
