// ==UserScript==
// @name         Annict Hide Future Programs
// @namespace    https://tampermonkey.net/
// @version      0.1.2
// @description  Annict の「記録するページ」で翌日以降の番組を非表示にします。さらに未視聴エピソードがない作品を非表示にします。
// @author       SlashNephy <spica@starry.blue>
// @match        https://annict.com/*
// @license      MIT license
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=annict.com
// @downloadURL  https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/annict-hide-future-programs.user.js
// @updateURL    https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/annict-hide-future-programs.user.js
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
