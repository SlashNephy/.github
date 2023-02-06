import { onReady } from '../lib/amq/onReady'

import type { GameStartingEvent, PlayerProfileEvent } from '../types/amq'

type CustomLink = {
  id: string
  title: string
  target?: string
  href(lists: PlayerAnimeList[]): string | null
}

type EvaluatedCustomLink = Omit<CustomLink, 'id' | 'href'> & { href: string }

const links: CustomLink[] = [
  {
    id: 'sanime-link',
    title: 'sanime',
    target: '_blank',
    href(lists: PlayerAnimeList[]): string | null {
      const users: string[] = []
      for (const list of lists) {
        if (list.username === null) {
          continue
        }

        switch (list.type) {
          // AniList
          case 1:
            users.push(`anilist:${list.username.toLowerCase()}`)
            break
          default:
          // sanime 側未実装
        }
      }

      if (users.length === 0) {
        return null
      }

      return `https://sanime.rinsuki.net/show?users=${users.join(',')}`
    },
  },
  {
    id: 'sanime2-link',
    title: 'sanime2',
    target: '_blank',
    href(lists: PlayerAnimeList[]): string | null {
      const users: string[] = []
      for (const list of lists) {
        if (list.username === null) {
          continue
        }

        switch (list.type) {
          // AniList
          case 1:
            users.push(`anilist%3A${list.username.toLowerCase()}`)
            break
          default:
          // sanime2 側未実装
        }
      }

      if (users.length === 0) {
        return null
      }

      return `https://sanime.sno2wman.net/?users=${users.join('%2C')}`
    },
  },
  {
    id: 'illyyllm-link',
    title: 'illyyllm',
    target: '_blank',
    href(lists: PlayerAnimeList[]): string | null {
      const users: string[] = []
      for (const list of lists) {
        if (list.username === null) {
          continue
        }

        switch (list.type) {
          // AniList
          case 1:
            users.push(list.username)
            break
          default:
          // illyyllm 側未実装
        }
      }

      if (users.length === 0) {
        return null
      }

      return `https://i-love-love-you-you-love-love-me.vercel.app/?anilist=${users.join(',')}`
    },
  },
]

type PlayerAnimeList = {
  type: PlayerProfileEvent['list']['listId']
  username: string | null
}

const handle = (playerNames: string[]) => {
  if (playerNames.length > 20) {
    return
  }

  const container = getOrCreateLinkContainer('anime-list-links')
  fetchPlayerAnimeLists(playerNames)
    .then((animeLists) => {
      renderLinks(
        container,
        links
          .map((link) => ({
            ...link,
            href: link.href(animeLists),
          }))
          .filter((x): x is Omit<typeof x, 'href'> & { href: string } => x.href !== null)
      )
    })
    .catch(console.error)
}

const handleGameStarting = (event: GameStartingEvent) => {
  const playerNames = event.players.map((p) => p.name)
  handle(playerNames)
}

const handleAnswerResults = () => {
  const playerNames = Object.values(unsafeWindow.quiz.players).map((p) => p._name)
  handle(playerNames)
}

const cache: { playerNames: string[]; lists: PlayerAnimeList[] } = {
  playerNames: [],
  lists: [],
}

const fetchPlayerAnimeLists = async (playerNames: string[]) => {
  return new Promise<PlayerAnimeList[]>((resolve) => {
    if (contentEquals(cache.playerNames, playerNames)) {
      resolve(cache.lists)
      return
    }

    const lists: PlayerAnimeList[] = []
    const listener = new Listener('player profile', (event) => {
      lists.push({
        type: event.list.listId,
        username: event.list.listUser,
      })

      if (lists.length === playerNames.length) {
        listener.unbindListener()
        cache.playerNames = playerNames
        cache.lists = lists
        resolve(lists)
        return
      }
    })
    listener.bindListener()

    for (const playerName of playerNames) {
      unsafeWindow.socket.sendCommand({
        type: 'social',
        command: 'player profile',
        data: {
          name: playerName,
        },
      })
    }
  })
}

const contentEquals = <T>(a: T[], b: T[]) => {
  const setA = new Set(a)
  const setB = new Set(b)

  return setA.size === setB.size && a.every((x) => setB.has(x))
}

const getOrCreateLinkContainer = (id: string) => {
  const existing = document.getElementById(id)
  if (existing !== null) {
    while (existing.lastElementChild !== null) {
      existing.removeChild(existing.lastElementChild)
    }

    return existing
  }

  const element = document.createElement('div')
  element.id = id

  const container = document.getElementById('qpStandingItemContainer')
  if (container === null) {
    throw new Error('#qpStandingItemContainer is not found.')
  }

  const target = container.querySelector<HTMLDivElement>('div#qpScoreBoardEntryContainer')
  if (target === null) {
    throw new Error('div#qpScoreBoardEntryContainer is not found.')
  }

  container.insertBefore(element, target.nextElementSibling)

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

onReady(() => {
  new Listener('Game Starting', handleGameStarting).bindListener()
  new Listener('answer results', handleAnswerResults).bindListener()

  AMQ_addScriptData({
    name: 'sanime Link',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description: 'Display links to sanime and "i(lyl)2m" in the player list.',
  })
})
