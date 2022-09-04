// ==UserScript==
// @name            dominion.games Auto Table Setter
// @namespace       https://github.com/SlashNephy
// @version         0.3.3
// @author          SlashNephy
// @description     Automatically configures the table settings in dominion.games.
// @description:ja  dominion.games の卓設定を自動的に設定します。
// @homepage        https://scrapbox.io/slashnephy/Dominion_Online_%E3%81%AE%E5%8D%93%E3%82%92%E8%87%AA%E5%8B%95%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/Dominion_Online_%E3%81%AE%E5%8D%93%E3%82%92%E8%87%AA%E5%8B%95%E3%81%A7%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B_UserScript
// @icon            https://www.google.com/s2/favicons?sz=64&domain=dominion.games
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/dominion-online-auto-table-setter.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/dominion-online-auto-table-setter.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://dominion.games/
// @grant           none
// @license         MIT license
// ==/UserScript==

const updateSettings = () => {
  document.querySelector('button[ng-click="$ctrl.switchView()"]')?.click()
  document.querySelector('input[ng-model="$ctrl.tableRules.useVPCounter"]')?.click()
  document.querySelector('button[ng-click="$ctrl.showKingdomSelection()"]')?.click()
  for (const element of document.querySelectorAll('input.expansion-checkbox')) {
    element.click()
  }
  for (let i = 0; i < 2; i++) {
    document.querySelector('three-valued-button[ng-model="kc.kingdom.colonies"] button')?.click()
    document.querySelector('three-valued-button[ng-model="kc.kingdom.shelters"] button')?.click()
  }
  for (let i = 0; i < 2; i++) {
    document.querySelector('div[ng-click="$ctrl.addNewSlot()"]')?.click()
  }
  for (let i = 0; i < 2; i++) {
    document.querySelector('div[ng-if="$ctrl.canBeNothing()"]')?.click()
  }
  for (const element of document.querySelectorAll('div.landscape-type-text.type-W')) {
    element.click()
  }
  document.querySelector('input[ng-click="kc.close()"]')?.click()
  alert('Table settings applied!')
}
const observe = () => {
  const target = document.querySelector('div.window-container > div')
  if (target === null) {
    setTimeout(observe, 1000)
    return
  }
  let updated = false
  const observer = new MutationObserver((records) => {
    const r = records[0]
    console.log(r)
    if (r.target && r.target instanceof Element && r.target.classList.contains('my-table') && !updated) {
      updateSettings()
      updated = true
    } else if (r.target && r.target instanceof Element && r.target.classList.contains('new-table') && updated) {
      updated = false
    }
  })
  observer.observe(target, {
    attributes: true,
    attributeFilter: ['class'],
  })
}
window.addEventListener('load', observe)
