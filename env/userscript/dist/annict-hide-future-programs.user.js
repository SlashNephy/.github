// ==UserScript==
// @name            Annict Hide Future Programs
// @namespace       https://github.com/SlashNephy
// @version         0.1.4
// @author          SlashNephy
// @description     Hide programs for the next day or later in Annict track page. In addition, it hides works that have no unwatched episodes.
// @description:ja  Annict の「記録するページ」で翌日以降の番組を非表示にします。さらに未視聴エピソードがない作品を非表示にします。
// @homepage        https://scrapbox.io/slashnephy/Annict_%E3%81%AE%E8%A8%98%E9%8C%B2%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%A7%E6%9C%AA%E6%9D%A5%E3%81%AE%E6%94%BE%E9%80%81%E4%BA%88%E5%AE%9A%E3%82%92%E9%9D%9E%E8%A1%A8%E7%A4%BA%E3%81%AB%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/Annict_%E3%81%AE%E8%A8%98%E9%8C%B2%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%A7%E6%9C%AA%E6%9D%A5%E3%81%AE%E6%94%BE%E9%80%81%E4%BA%88%E5%AE%9A%E3%82%92%E9%9D%9E%E8%A1%A8%E7%A4%BA%E3%81%AB%E3%81%99%E3%82%8B_UserScript
// @icon            https://www.google.com/s2/favicons?sz=64&domain=annict.com
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/annict-hide-future-programs.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/annict-hide-future-programs.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://annict.com/*
// @grant           none
// @license         MIT license
// ==/UserScript==

const main = () => {
  if (!location.href.startsWith('https://annict.com/track')) {
    return
  }
  for (const card of document.querySelectorAll('div.card.u-card-flat')) {
    const iconElement = card.querySelector('.fa-check-circle')
    if (iconElement) {
      card.style.display = 'none'
      continue
    }
    const dateElement = card.querySelector('div.col div[class="small"] span.text-muted')
    if (!dateElement?.textContent) {
      continue
    }
    const datetime = Date.parse(dateElement.textContent)
    const today = Date.now()
    if (datetime > today + 24 * 60 * 60 * 1000) {
      card.style.display = 'none'
    }
  }
}
main()
window.addEventListener('turbo:load', () => {
  main()
})
