// ==UserScript==
// @name         dominion.games Auto Table Setter
// @namespace    https://tampermonkey.net/
// @version      0.3.1
// @description  dominion.games の卓設定を自動的に設定します。
// @author       SlashNephy <spica@starry.blue>
// @match        https://dominion.games/
// @license      MIT license
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dominion.games
// @downloadURL  https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/dominion-online-auto-table-setter.user.js
// @updateURL    https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/dominion-online-auto-table-setter.user.js
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
