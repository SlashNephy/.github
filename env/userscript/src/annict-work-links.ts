import { fetchArmEntries } from '../lib/external/arm'

import type { ArmEntry } from '../lib/external/arm'

const annictWorkPageUrlPattern = /^https:\/\/annict\.com\/works\/(\d+)/

const cachedEntries: ArmEntry[] = []

const main = async () => {
  const match = annictWorkPageUrlPattern.exec(window.location.href)
  if (!match) {
    return
  }

  const annictId = parseInt(match[1], 10)
  if (!annictId) {
    throw new Error('Failed to extract Annict work id')
  }

  const links = document.querySelector(
    'div.c-work-header.pt-3 > div.container > div > div.col.mt-3.mt-sm-0 > ul.list-inline.mb-0'
  )
  if (!links || links.childNodes.length === 0) {
    throw new Error('Failed to find target container')
  }

  if (cachedEntries.length === 0) {
    const entries = await fetchArmEntries()
    cachedEntries.push(...entries)
  }

  const entry = cachedEntries.find((x) => x.annict_id === annictId)
  if (!entry) {
    console.warn(`arm entry not found: annict_id=${annictId}`)
    return
  }

  if (entry.syobocal_tid !== undefined && links.firstChild) {
    const link = links.firstChild.cloneNode(true)
    const aHtml = link.firstChild as HTMLAnchorElement
    aHtml.href = `https://cal.syoboi.jp/tid/${entry.syobocal_tid}`
    aHtml.childNodes[0].textContent = 'しょぼいカレンダー'
    links.appendChild(link)
  }

  if (entry.anilist_id !== undefined && links.firstChild) {
    const link = links.firstChild.cloneNode(true)
    const aHtml = link.firstChild as HTMLAnchorElement
    aHtml.href = `https://anilist.co/anime/${entry.anilist_id}`
    aHtml.childNodes[0].textContent = 'AniList'
    links.appendChild(link)
  }

  if (entry.mal_id !== undefined && links.firstChild) {
    const link = links.firstChild.cloneNode(true)
    const aHtml = link.firstChild as HTMLAnchorElement
    aHtml.href = `https://myanimelist.net/anime/${entry.mal_id}`
    aHtml.childNodes[0].textContent = 'MyAnimeList'
    links.appendChild(link)
  }
}

document.addEventListener('turbo:load', () => {
  main().catch(console.error)
})
