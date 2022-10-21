// ==UserScript==
// @name            AKASHI Show Remaining Hours
// @namespace       https://github.com/SlashNephy
// @version         0.1.0
// @author          SlashNephy
// @description     Display the remaining required working hours in attendance page.
// @description:ja  出勤簿ページに残り必要な労働時間を表示します。
// @homepage        https://scrapbox.io/slashnephy/AKASHI_%E3%81%AE%E6%AE%8B%E3%82%8A%E5%BF%85%E8%A6%81%E5%8A%B4%E5%83%8D%E6%99%82%E9%96%93%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AKASHI_%E3%81%AE%E6%AE%8B%E3%82%8A%E5%BF%85%E8%A6%81%E5%8A%B4%E5%83%8D%E6%99%82%E9%96%93%E3%82%92%E8%A1%A8%E7%A4%BA%E3%81%99%E3%82%8B_UserScript
// @icon            https://www.google.com/s2/favicons?sz=64&domain=atnd.ak4.jp
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/akashi-show-remaining-hours.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/akashi-show-remaining-hours.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://atnd.ak4.jp/attendance
// @grant           none
// @license         MIT license
// ==/UserScript==

document.addEventListener('DOMNodeInserted', () => {
  const b = document.querySelector('#time-card-accordion-02 > div > div > table > tbody > tr > td:nth-child(2) > span')
  if (b === null || b.textContent?.includes('(') !== false) {
    return
  }
  const [a1, a2] =
    document
      .querySelector('#time-card-accordion-02 > div > div > table > tbody > tr > td:nth-child(1) > span')
      ?.textContent?.trim()
      .split(':') ?? []
  const [b1, b2] = b.textContent.trim().split(':')
  const [c1, c2] =
    document
      .querySelector('#time-card-accordion-02 > div > div > table > tbody > tr > td:nth-child(3) > span')
      ?.textContent?.trim()
      .split(':') ?? []
  let h = parseInt(a1) - parseInt(b1) - parseInt(c1)
  let m = parseInt(a2) - parseInt(b2) - parseInt(c2)
  if (m < 0) {
    h -= Math.ceil(-m / 60)
    m = 60 + (m % 60)
  }
  const d = (h + m / 60) / 8
  b.textContent += ` (-${h}:${m} = -${d.toFixed(2)} d)`
})
