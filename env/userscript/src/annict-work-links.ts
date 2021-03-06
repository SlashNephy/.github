const ANNICT_WORK_PAGE_URL_PATTERN = /^https:\/\/annict\.com\/works\/(\d+)/

type ArmEntry = {
  mal_id?: number
  anilist_id?: number
  annict_id?: number
  syobocal_tid?: number
}

let cachedEntries: ArmEntry[] | null = null

const fetchArmEntries = async (): Promise<ArmEntry[]> => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: 'GET',
      url: 'https://raw.githubusercontent.com/kawaiioverflow/arm/master/arm.json',
      onload: (response) => {
        const entries = JSON.parse(response.responseText) as ArmEntry[]
        resolve(entries)
      },
      onerror: (error) => {
        reject(error)
      },
    })
  })
}

const main = async () => {
  const match = location.href.match(ANNICT_WORK_PAGE_URL_PATTERN)
  if (!match) {
    return
  }

  const annictId = parseInt(match[1])
  if (!annictId) {
    throw new Error('Failed to extract Annict work id')
  }

  const links = document.querySelector('div.c-work-header.pt-3 > div.container > div > div.col.mt-3.mt-sm-0 > ul.list-inline.mb-0')
  if (!links || links.childNodes.length === 0) {
    throw new Error('Failed to find target container')
  }

  const entries = cachedEntries ?? (await fetchArmEntries())
  cachedEntries = entries

  const entry = entries.find((x) => x.annict_id === annictId)
  if (!entry) {
    console.warn(`arm entry not found: annict_id=${annictId}`)
    return
  }

  if (entry.syobocal_tid && links.firstChild) {
    const link = links.firstChild.cloneNode(true)
    const a = link.firstChild as HTMLAnchorElement
    a.href = `https://cal.syoboi.jp/tid/${entry.syobocal_tid}`
    a.childNodes[0].textContent = 'しょぼいカレンダー'
    links.appendChild(link)
  }

  if (entry.mal_id && links.firstChild) {
    const link = links.firstChild.cloneNode(true)
    const a = link.firstChild as HTMLAnchorElement
    a.href = `https://myanimelist.net/anime/${entry.mal_id}`
    a.childNodes[0].textContent = 'MyAnimeList'
    links.appendChild(link)
  }

  if (entry.anilist_id && links.firstChild) {
    const link = links.firstChild.cloneNode(true)
    const a = link.firstChild as HTMLAnchorElement
    a.href = `https://anilist.co/anime/${entry.anilist_id}`
    a.childNodes[0].textContent = 'AniList'
    links.appendChild(link)
  }
}

window.addEventListener('turbo:load', () => {
  main().catch(console.error)
})
