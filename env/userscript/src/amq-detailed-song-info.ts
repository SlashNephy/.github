import { addScriptData } from '../lib/thirdparty/amqScriptInfo'

import type { AnswerResultsPayload } from '../types/amq'

type CustomRow = {
  id: string
  title: string
  content(payload: AnswerResultsPayload): string
}

const rows: CustomRow[] = [
  {
    id: 'difficulty-row',
    title: 'Difficulty',
    content(payload: AnswerResultsPayload): string {
      return `${payload.songInfo.animeDifficulty.toFixed(1)} / 100`
    },
  },
  {
    id: 'vintage-row',
    title: 'Vintage',
    content(payload: AnswerResultsPayload): string {
      return payload.songInfo.vintage
    },
  },
  {
    id: 'format-row',
    title: 'Format',
    content(payload: AnswerResultsPayload): string {
      return payload.songInfo.animeType
    },
  },
  {
    id: 'rating-row',
    title: 'Rating',
    content(payload: AnswerResultsPayload): string {
      return `${payload.songInfo.animeScore.toFixed(2)} / 10`
    },
  },
]

const handle = (payload: AnswerResultsPayload) => {
  const container = document.querySelector('#qpAnimeContainer div.qpSideContainer:not([id])')
  if (!container) {
    throw new Error('container is not found.')
  }

  for (const row of rows) {
    const element = document.getElementById(row.id) ?? createDivElementWithId(container, row.id)

    const contentElement = element.querySelector('.row-content')
    if (contentElement !== null) {
      contentElement.textContent = row.content(payload)
    } else {
      renderRow(element, row.title, row.content(payload))
    }
  }
}

const createDivElementWithId = (container: Element, id: string) => {
  const element = document.createElement('div')
  element.id = id

  const targetElement = container.querySelector('div#qpInfoHider')
  if (targetElement === null) {
    throw new Error('div#qpInfoHider is not found.')
  }
  container.insertBefore(element, targetElement.previousElementSibling)

  return element
}

const renderRow = (element: HTMLElement, title: string, content: string) => {
  const h5 = document.createElement('h5')
  const b = document.createElement('b')
  const p = document.createElement('p')
  h5.appendChild(b)
  element.appendChild(h5)
  element.appendChild(p)

  element.classList.add('row')
  b.textContent = title
  p.classList.add('row-content')
  p.textContent = content
}

if ('Listener' in window) {
  const listener = new Listener<AnswerResultsPayload>('answer results', handle)
  listener.bindListener()
}

addScriptData({
  name: 'AMQ Detailed Song Info',
  author: 'SlashNephy &lt;spica@starry.blue&gt;',
  description: 'Display detailed information on the side panel of the song.',
})
