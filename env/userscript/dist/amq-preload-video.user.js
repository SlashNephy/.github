// ==UserScript==
// @name            AMQ Preload Video
// @namespace       https://github.com/SlashNephy
// @version         0.3.0
// @author          SlashNephy
// @description     Just enable media preloading. Buffering may be faster.
// @description:ja  プレイヤーのプリロードを有効にします。バッファリングが速くなるかもしれません。
// @homepage        https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E3%83%A1%E3%83%87%E3%82%A3%E3%82%A2%E3%82%92%E3%83%97%E3%83%AA%E3%83%AD%E3%83%BC%E3%83%89%E3%81%95%E3%81%9B%E3%82%8B_UserScript
// @homepageURL     https://scrapbox.io/slashnephy/AMQ_%E3%81%AE%E3%83%A1%E3%83%87%E3%82%A3%E3%82%A2%E3%82%92%E3%83%97%E3%83%AA%E3%83%AD%E3%83%BC%E3%83%89%E3%81%95%E3%81%9B%E3%82%8B_UserScript
// @icon            https://animemusicquiz.com/favicon-32x32.png
// @updateURL       https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-preload-video.user.js
// @downloadURL     https://github.com/SlashNephy/.github/raw/master/env/userscript/dist/amq-preload-video.user.js
// @supportURL      https://github.com/SlashNephy/.github/issues
// @match           https://animemusicquiz.com/*
// @require         https://cdn.jsdelivr.net/gh/TheJoseph98/AMQ-Scripts@b97377730c4e8553d2dcdda7fba00f6e83d5a18a/common/amqScriptInfo.js
// @grant           unsafeWindow
// @license         MIT license
// ==/UserScript==

const awaitFor = async (predicate, timeout) =>
  new Promise((resolve, reject) => {
    let timer
    const interval = window.setInterval(() => {
      if (predicate()) {
        clearInterval(interval)
        clearTimeout(timer)
        resolve()
      }
    }, 500)
    if (timeout !== undefined) {
      timer = setTimeout(() => {
        clearInterval(interval)
        clearTimeout(timer)
        reject(new Error('timeout'))
      }, timeout)
    }
  })

const onReady = (callback) => {
  if (document.getElementById('startPage')) {
    return
  }
  awaitFor(() => document.getElementById('loadingScreen')?.classList.contains('hidden') === true)
    .then(callback)
    .catch(console.error)
}

onReady(() => {
  document.addEventListener('DOMNodeInserted', () => {
    for (const element of document.querySelectorAll('video')) {
      element.preload = 'auto'
    }
  })
  AMQ_addScriptData({
    name: 'Preload Video',
    author: 'SlashNephy &lt;spica@starry.blue&gt;',
    description:
      'Just enable media preloading. Speed up buffering. Disclaimer: This script may violate terms of service, USE AT YOUR OWN RISK!',
  })
})
