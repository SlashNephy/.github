import { onReady } from '../lib/amq/onReady'
import { fetchJikanAnimeById } from '../lib/external/jikan'
import { fetchMalAnimeScoreById } from '../lib/external/mal'
import { GM_Value } from '../lib/tampermonkey/GM_Value'

import type { AnswerResultsEvent } from '../types/amq'
import type { CustomLink, CustomRow } from '../types/amq-detailed-song-info'

type EvaluatedCustomRow = Omit<CustomRow, 'id' | 'content'> & { readonly content: string | null }
type EvaluatedCustomLink = Omit<CustomLink, 'id' | 'href'> & { readonly href: string }

const scoreCache = new Map<number, number | null>()
const titleCache = new Map<number, string | null>()

const showDifficultyRow = new GM_Value('SHOW_DIFFICULTY_ROW', true)
const showVintageRow = new GM_Value('SHOW_VINTAGE_ROW', true)
const showFormatRow = new GM_Value('SHOW_FORMAT_ROW', true)
const showRatingRow = new GM_Value('SHOW_RATING_ROW', true)
const showSpotifyLink = new GM_Value('SHOW_SPOTIFY_LINK', true)
const showYouTubeLink = new GM_Value('SHOW_YOUTUBE_LINK', true)
const showAnnLink = new GM_Value('SHOW_ANN_LINK', true)

const rows: CustomRow[] = [
  {
    id: 'difficulty-row',
    title: 'Difficulty',
    isEnabled() {
      return showDifficultyRow.get()
    },
    content(event: AnswerResultsEvent) {
      return `${event.songInfo.animeDifficulty.toFixed(1)} / 100`
    },
  },
  {
    id: 'vintage-row',
    title: 'Vintage',
    isEnabled() {
      return showVintageRow.get()
    },
    content(event: AnswerResultsEvent) {
      return event.songInfo.vintage
    },
  },
  {
    id: 'format-row',
    title: 'Format',
    isEnabled() {
      return showFormatRow.get()
    },
    content(event: AnswerResultsEvent) {
      return event.songInfo.animeType
    },
  },
  {
    id: 'rating-row',
    title: 'Rating',
    isEnabled() {
      return showRatingRow.get()
    },
    async content(event: AnswerResultsEvent) {
      const { malId } = event.songInfo.siteIds
      let score = scoreCache.get(malId)
      let title = titleCache.get(malId)
      if (score === undefined || title === undefined) {
        try {
          // Jikan API
          const result = await fetchJikanAnimeById(malId)
          score = result.data.score
          title = result.data.title_japanese
        } catch {
          try {
            // MyAnimeList API
            const result = await fetchMalAnimeScoreById(malId)
            score = result.mean
            title = result.alternative_titles.ja
          } catch {
            score = null
            title = null
          }
        }
        scoreCache.set(malId, score)
        titleCache.set(malId, title)
      }

      if (title !== null && navigator.language === 'ja') {
        const element = document.getElementById('qpAnimeName')
        if (element !== null && title !== element.textContent?.trim()) {
          element.innerHTML = `${title}<br/>(${element.textContent})`
          unsafeWindow.quiz.infoContainer.fitTextToContainer()
        }
      }

      if (score === null) {
        return `${event.songInfo.animeScore.toFixed(2)} / 10`
      }

      return `${score.toFixed(2)} / 10 (MAL)`
    },
  },
]

const links: CustomLink[] = [
  {
    id: 'spotify-link',
    title: 'Spotify',
    target: '_blank',
    isEnabled() {
      return showSpotifyLink.get()
    },
    href(event: AnswerResultsEvent) {
      return `spotify://search/${encodeURIComponent(event.songInfo.songName)}%20${encodeURIComponent(
        event.songInfo.artist
      )}/tracks`
    },
  },
  {
    id: 'youtube-link',
    title: 'YouTube',
    target: '_blank',
    isEnabled() {
      return showYouTubeLink.get()
    },
    href(event: AnswerResultsEvent) {
      return `https://www.youtube.com/results?search_query=${encodeURIComponent(
        event.songInfo.songName
      )}+${encodeURIComponent(event.songInfo.artist)}`
    },
  },
  {
    id: 'ann-link',
    title: 'ANN',
    target: '_blank',
    isEnabled() {
      return showAnnLink.get()
    },
    href(event: AnswerResultsEvent) {
      return `https://www.animenewsnetwork.com/encyclopedia/anime.php?id=${event.songInfo.annId}`
    },
  },
]

const handle = (event: AnswerResultsEvent) => {
  const container = document.querySelector('#qpAnimeContainer #qpSongInfoContainer')
  if (!container) {
    throw new Error('container is not found.')
  }

  // CustomRow
  for (const row of rows) {
    if (row.isEnabled !== undefined && !row.isEnabled()) {
      continue
    }

    const element = getOrCreateRow(container, row.id)

    // 既に row が挿入されていれば、textContent の更新だけ行う
    const contentElement = element.querySelector('.row-content')
    if (contentElement !== null) {
      const content = row.content(event)

      // Promise の時は先にテキストを書き換えておく
      if (content !== null && typeof content !== 'string') {
        contentElement.textContent = 'Loading...'
      }

      Promise.resolve(content)
        .then((c) => {
          contentElement.textContent = c
        })
        .catch(console.error)
    } else {
      const content = row.content(event)
      Promise.resolve(content)
        .then((c) => {
          renderRow(element, {
            ...row,
            content: c,
          })
        })
        .catch(console.error)
    }
  }

  // CustomLink
  const element = getOrCreateLinkContainer(container, 'link-container')
  renderLinks(
    element,
    links
      .filter((link) => link.isEnabled === undefined || link.isEnabled())
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

const renderLinks = (element: HTMLElement, ls: EvaluatedCustomLink[]) => {
  const b = document.createElement('b')
  element.append(b)

  const lastIndex = ls.length - 1
  for (const [index, link] of ls.entries()) {
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

onReady(() => {
  new Listener('answer results', handle).bindListener()

  AMQ_addScriptData({
    name: 'Detailed Song Info',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Display detailed information on the side panel of the song.',
  })

  AMQ_addStyle(`
    .custom-hider {
      padding: 50% 0;
    }
  `)
})
